import 'package:flutter/material.dart';
import 'package:bluewhale_link/OPUS/component/opus_banner.dart';
import 'package:bluewhale_link/attendance/component/attendance_card.dart';
import 'package:bluewhale_link/attendance/component/calendar.dart';
import 'package:bluewhale_link/attendance/model/attendance_model.dart';
import 'package:bluewhale_link/attendance/provider/attendance_provider.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AttendanceScreen extends ConsumerStatefulWidget {
  const AttendanceScreen({super.key});

  @override
  ConsumerState<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends ConsumerState<AttendanceScreen> {
  DateTime selectedDay = DateTime.utc(
    DateTime.now().year,
    DateTime.now().month,
    DateTime.now().day,
  );
  DateTime focusedDay = DateTime.now();

  @override
  void initState() {
    super.initState();
    ref.read(attendanceProvider.notifier).fetchAttendances();
  }

  onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      this.selectedDay = selectedDay;
      this.focusedDay = selectedDay;
    });
  }

  bool isSameDay(DateTime? date1, DateTime? date2) {
    return date1?.year == date2?.year &&
        date1?.month == date2?.month &&
        date1?.day == date2?.day;
  }

  @override
  Widget build(BuildContext context) {
    final attendanceList = ref.watch(attendanceProvider);

    final filteredAttendanceList = attendanceList.where((attendance) {
      return isSameDay(attendance.createdAt, selectedDay);
    }).toList();

    return DefaultLayout(
      title: '출석 현황',
      child: SafeArea(
        child: Column(
          children: [
            Calendar(
              selectedDay: selectedDay,
              focusedDay: focusedDay,
              onDaySelected: onDaySelected,
              attendanceList: attendanceList,
            ),
            const SizedBox(height: 8.0),
            OpusBanner(selectedDay: selectedDay),
            const SizedBox(height: 8.0),
            _AttendanceList(
                attendanceList: filteredAttendanceList,
                selectedDate: selectedDay),
          ],
        ),
      ),
    );
  }
}

class _AttendanceList extends ConsumerWidget {
  final DateTime selectedDate;
  final List<AttendanceModel> attendanceList;

  const _AttendanceList({
    required this.selectedDate,
    required this.attendanceList,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (attendanceList.isEmpty) {
      return const Expanded(child: Center(child: Text('등하원 기록이 없습니다.')));
    }

    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: ListView.separated(
          itemCount: attendanceList.length,
          separatorBuilder: (context, index) => const SizedBox(height: 8.0),
          itemBuilder: (context, index) {
            final attendance = attendanceList[index];
            return _buildOpusItem(attendance, context, selectedDate);
          },
        ),
      ),
    );
  }

  Widget _buildOpusItem(
      AttendanceModel attendance, BuildContext context, DateTime selectedDate) {
    return Dismissible(
      key: ObjectKey(attendance.attendanceId),
      direction: DismissDirection.endToStart,
      onDismissed: (DismissDirection direction) {
        // 삭제 로직
      },
      child: GestureDetector(
        onTap: () {
          // showModalBottomSheet(
          //   context: context,
          //   isScrollControlled: true,
          //   builder: (_) => OpusBottomSheet(selectedDate: selectedDate, opusId: opus.id),
          // );
        },
        child: AttendanceCard(
            title: attendance.onLink ? "등원" : "하원", time: attendance.createdAt),
      ),
    );
  }
}
