import 'package:bluewhale_link/schedule/repository/schedule_repository.dart';
import 'package:flutter/material.dart';
import 'package:bluewhale_link/schedule/component/schedule_calendar.dart';
import 'package:bluewhale_link/schedule/component/schedule_bottom_sheet.dart';
import 'package:bluewhale_link/schedule/component/schedule_card.dart';
import 'package:bluewhale_link/schedule/component/today_banner.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/schedule/model/schedule_model.dart';
import 'package:bluewhale_link/schedule/provider/schedule_provider.dart';
import 'package:bluewhale_link/user/provider/user_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ScheduleScreen extends ConsumerStatefulWidget {
  const ScheduleScreen({
    Key? key,
  }) : super(key: key);

  @override
  ConsumerState<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends ConsumerState<ScheduleScreen> {
  DateTime selectedDay = DateTime.utc(
    DateTime.now().year,
    DateTime.now().month,
    DateTime.now().day,
  );
  DateTime focusedDay = DateTime.now();

  Map<DateTime, double> calculateAverageCompletion(List<ScheduleModel> schedules) {
    Map<DateTime, List<double>> tempCompletionSums = {};

    for (var schedule in schedules) {
      double completion = schedule.completion;
      DateTime scheduleDate = DateTime(schedule.date.year, schedule.date.month, schedule.date.day);

      if (!tempCompletionSums.containsKey(scheduleDate)) {
        tempCompletionSums[scheduleDate] = [];
      }
      tempCompletionSums[scheduleDate]!.add(completion);
    }

    Map<DateTime, double> averageCompletionRates = {};
    tempCompletionSums.forEach((date, completions) {
      double totalCompletionSum = completions.reduce((a, b) => a + b);
      averageCompletionRates[date] = totalCompletionSum / completions.length;
    });

    return averageCompletionRates;
  }


  @override
  Widget build(BuildContext context) {
    final schedules = ref.watch(scheduleProvider);
    final userData = ref.watch(userProvider);
    final bool isParent = userData.role == 'parent';

    if (userData.userId == 0) {
      ref.read(userProvider.notifier).fetchUserInfo();
    }

    Map<DateTime, double> averageCompletionRates =
        calculateAverageCompletion(schedules);

    bool isSameDay(DateTime date1, DateTime date2) {
      return date1.year == date2.year &&
          date1.month == date2.month &&
          date1.day == date2.day;
    }

    final filteredSchedules = schedules.where((schedule) {
      return isSameDay(schedule.date, selectedDay);
    }).toList();

    return Scaffold(
      floatingActionButton: isParent ? null : renderFloatingActionButton(),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              height: 40.0,
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: PRIMARY_COLOR,
                    width: 1.0,
                  ),
                ),
              ),
              child: Center(
                child: Text(
                  userData.motto ?? '나의 목표',
                  style: const TextStyle(
                    fontSize: 14.0,
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            Calendar(
              selectedDay: selectedDay,
              focusedDay: focusedDay,
              onDaySelected: onDaySelected,
              averageCompletion: averageCompletionRates,
            ),
            const SizedBox(height: 8.0),
            TodayBanner(
              selectedDay: selectedDay,
              schedules: filteredSchedules,
            ),
            const SizedBox(height: 8.0),
            _ScheduleList(
              selectedDate: selectedDay,
              schedules: filteredSchedules,
              isParent: isParent,
            ),
          ],
        ),
      ),
    );
  }

  onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      this.selectedDay = selectedDay;
      this.focusedDay = selectedDay;
    });
  }

  FloatingActionButton renderFloatingActionButton() {
    return FloatingActionButton(
      onPressed: () {
        showModalBottomSheet(
          context: context,
          isScrollControlled: true,
          builder: (_) {
            return ScheduleBottomSheet(
              selectedDate: selectedDay,
            );
          },
        );
      },
      backgroundColor: PRIMARY_COLOR,
      child: const Icon(
        Icons.add,
        color: Colors.white,
      ),
    );
  }
}

class _ScheduleList extends ConsumerWidget {
  final DateTime selectedDate;
  final List<ScheduleModel> schedules;
  final bool isParent;

  const _ScheduleList({
    required this.selectedDate,
    required this.schedules,
    required this.isParent,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: schedules.isEmpty
            ? const Center(
                child: Text('스케줄이 없습니다.'),
              )
            : ListView.separated(
                itemCount: schedules.length + 1,
                separatorBuilder: (context, index) {
                  return const SizedBox(
                    height: 8.0,
                  );
                },
                itemBuilder: (context, index) {
                  if (index == schedules.length) {
                    return const SizedBox(height: 80.0);
                  }

                  final schedule = schedules[index];

                  return Dismissible(
                    key: ObjectKey(schedule.id),
                    direction: DismissDirection.endToStart,
                    onDismissed: isParent
                        ? null
                        : (DismissDirection direction) async {
                            try {
                              await ref
                                  .read(scheduleRepositoryProvider)
                                  .deleteSchedule(schedule.id);
                              ref
                                  .read(scheduleProvider.notifier)
                                  .fetchSchedules();
                            } catch (e) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text('삭제 중 오류가 발생했습니다.')));
                            }
                          },
                    child: GestureDetector(
                      onTap: isParent
                          ? null
                          : () {
                              showModalBottomSheet(
                                context: context,
                                isScrollControlled: true,
                                builder: (_) {
                                  return ScheduleBottomSheet(
                                    selectedDate: selectedDate,
                                    schedule: schedule,
                                    scheduleId: schedule.id,
                                  );
                                },
                              );
                            },
                      child: ScheduleCard(
                        id: schedule.id,
                        time: schedule.time,
                        content: schedule.content,
                        completion: schedule.completion,
                        subject: schedule.subject,
                        showControls: !isParent,
                        onStop: () {
                          showModalBottomSheet(
                            context: context,
                            isScrollControlled: true,
                            builder: (_) {
                              return ScheduleBottomSheet(
                                selectedDate: selectedDate,
                                schedule: schedule,
                                scheduleId: schedule.id,
                              );
                            },
                          );
                        },
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
