import 'dart:async';
import 'package:bluewhale_link/schedule/provider/schedule_provider.dart';
import 'package:bluewhale_link/schedule/repository/schedule_repository.dart';
import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ScheduleCard extends ConsumerStatefulWidget {
  final int id;
  final String content;
  final double completion;
  final String? subject;
  final int time;
  final bool showControls;
  final Function? onStop;

  const ScheduleCard({
    required this.id,
    required this.content,
    required this.completion,
    this.subject = '과목',
    required this.time,
    this.showControls = true,
    this.onStop,
    Key? key,
  }) : super(key: key);

  @override
  _ScheduleCardState createState() => _ScheduleCardState();
}

class _ScheduleCardState extends ConsumerState<ScheduleCard> {
  late int timeInSeconds;
  Timer? timer;
  bool isRunning = false;
  bool isPaused = false;

  @override
  void initState() {
    super.initState();
    timeInSeconds = widget.time;
  }

  void startTimer() {
    setState(() {
      isRunning = true;
      isPaused = false;
    });
    timer = Timer.periodic(const Duration(seconds: 1), (_) {
      setState(() {
        timeInSeconds++;
      });
    });
  }

  void pauseTimer() {
    setState(() => isPaused = true);
    timer?.cancel();
    updateScheduleOnServer();
  }

  void stopTimer() {
    if (isRunning) {
      setState(() {
        isRunning = false;
        isPaused = false;
      });
      timer?.cancel();
      updateScheduleOnServer();

      if (widget.onStop != null) {
        widget.onStop!();
      }
    }
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  void updateScheduleOnServer() async {
    final repository = ref.read(scheduleRepositoryProvider);
    try {
      await repository.updateSchedule(widget.id, {'time': timeInSeconds});
      ref.read(scheduleProvider.notifier).fetchSchedules();
    } catch (e) {
      print(e);
    }
  }


  @override
  Widget build(BuildContext context) {
    return Container(
      height: 84.0,
      decoration: BoxDecoration(
        border: Border.all(
          width: 1.0,
          color: PRIMARY_COLOR,
        ),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                widget.subject ?? '과목',
                style: const TextStyle(fontWeight: FontWeight.w600),
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(width: 8.0),
              _Content(content: widget.content),
              const SizedBox(width: 8.0),
              if (widget.showControls)
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    children: [
                      Text(
                        '${(widget.completion).toStringAsFixed(0)}%',
                        style: const TextStyle(
                          fontSize: 12.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(
                        width: 4.0,
                      ),
                      Text(
                        _formatTime(timeInSeconds),
                        style: const TextStyle(
                          fontSize: 12.0,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      if (!isRunning) // 처음 상태: 재생 버튼만 표시
                        IconButton(
                          icon: const Icon(Icons.play_arrow),
                          onPressed: startTimer,
                        ),
                      if (isRunning &&
                          !isPaused) // 실행 중이지만 일시정지 상태가 아닐 때: 일시정지와 정지 버튼 표시
                        IconButton(
                          icon: const Icon(Icons.pause),
                          onPressed: pauseTimer,
                        ),
                      if (isRunning &&
                          isPaused) // 실행 중이면서 일시정지 상태일 때: 재생과 정지 버튼 표시
                        IconButton(
                          icon: const Icon(Icons.play_arrow),
                          onPressed: startTimer,
                        ),
                      if (isRunning) // 실행 중일 때 (일시정지 상태 무관): 정지 버튼 표시
                        IconButton(
                          icon: const Icon(Icons.stop),
                          onPressed: stopTimer,
                        ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Content extends StatelessWidget {
  final String content;

  const _Content({
    required this.content,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Text(
        content,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }
}

String _formatTime(int timeInSeconds) {
  final int hours = timeInSeconds ~/ 3600;
  final int minutes = (timeInSeconds % 3600) ~/ 60;
  return "${hours.toString()}시간 ${minutes.toString().padLeft(2, '0')}분";
}
