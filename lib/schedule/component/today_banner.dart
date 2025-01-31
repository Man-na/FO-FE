import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/schedule/model/schedule_model.dart';

class TodayBanner extends StatelessWidget {
  final DateTime selectedDay;
  final List<ScheduleModel> schedules;

  const TodayBanner({
    required this.selectedDay,
    required this.schedules,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const textStyle = TextStyle(fontWeight: FontWeight.w600, color: Colors.white);

    // 시간 단위로 변환 (초 -> 분)
    int totalMinutes = schedules
        .map((schedule) => schedule.time ~/ 60) // 초 단위 time을 분 단위로 변환
        .fold(0, (sum, duration) => sum + duration);

    int hours = totalMinutes ~/ 60;
    int minutes = totalMinutes % 60;

    return Container(
      color: PRIMARY_COLOR,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '${selectedDay.year}년 ${selectedDay.month}월 ${selectedDay.day}일',
              style: textStyle,
            ),
            Text(
              '$hours시간 $minutes분',
              style: textStyle,
            ),
          ],
        ),
      ),
    );
  }
}
