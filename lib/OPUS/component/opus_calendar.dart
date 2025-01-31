import 'package:flutter/material.dart';
import 'package:bluewhale_link/OPUS/model/opus_model.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:table_calendar/table_calendar.dart';

class Calendar extends StatelessWidget {
  final DateTime? selectedDay;
  final DateTime focusedDay;
  final OnDaySelected? onDaySelected;
  final Map<DateTime, double>? averageCompletion;
  final Map<DateTime, int>? scheduleCounts;
  final List<OpusModel>? opusList;

  const Calendar({
    required this.selectedDay,
    required this.focusedDay,
    required this.onDaySelected,
    this.averageCompletion,
    this.scheduleCounts,
    this.opusList,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final defaultBoxDeco = BoxDecoration(
      borderRadius: BorderRadius.circular(6.0),
      color: Colors.grey[200],
    );

    final defaultTextStyle = TextStyle(
        color: Colors.grey[600], fontWeight: FontWeight.w700, fontSize: 14.0);

    return TableCalendar(
      locale: 'ko_KR',
      focusedDay: focusedDay,
      firstDay: DateTime(1800),
      lastDay: DateTime(3000),
      headerStyle: const HeaderStyle(
        formatButtonVisible: false,
        titleCentered: true,
        titleTextStyle: TextStyle(
          fontWeight: FontWeight.w700,
          fontSize: 16.0,
        ),
      ),
      calendarStyle: CalendarStyle(
        isTodayHighlighted: false,
        outsideDecoration: const BoxDecoration(
          shape: BoxShape.rectangle,
        ),
        defaultDecoration: defaultBoxDeco,
        weekendDecoration: defaultBoxDeco,
        selectedDecoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(6.0),
          border: Border.all(color: PRIMARY_COLOR, width: 1.0),
        ),
        defaultTextStyle: defaultTextStyle,
        weekendTextStyle: defaultTextStyle,
        selectedTextStyle: defaultTextStyle.copyWith(
          color: PRIMARY_COLOR,
        ),
        cellMargin: EdgeInsets.all(4.0),
      ),
      calendarBuilders: CalendarBuilders(
        defaultBuilder: (context, date, _) {
          return Padding(
            padding: const EdgeInsets.all(4.0),
            child: Container(
              height: 64.0,
              width: 64.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(6.0),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Text(
                    '${date.day}',
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontWeight: FontWeight.w700,
                      fontSize: 14.0,
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 4.0),
                      child: _buildDots(date),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
        selectedBuilder: (context, date, _) {
          return Padding(
            padding: const EdgeInsets.all(4.0),
            child: Container(
              height: 64.0,
              width: 64.0,
              decoration: BoxDecoration(
                border: Border.all(color: PRIMARY_COLOR, width: 1.0),
                borderRadius: BorderRadius.circular(6.0),
                color: Colors.white,
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Text(
                    '${date.day}',
                    style: TextStyle(
                      color: PRIMARY_COLOR,
                      fontWeight: FontWeight.w700,
                      fontSize: 14.0,
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomCenter,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 4.0),
                      child: _buildDots(date),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
      daysOfWeekStyle: DaysOfWeekStyle(
        weekdayStyle: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 12.0,
          color: Colors.black,
        ),
        weekendStyle: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 12.0,
          color: Colors.red,
        ),
      ),
      onDaySelected: onDaySelected,
      selectedDayPredicate: (DateTime date) {
        if (selectedDay == null) {
          return false;
        }
        return date.year == selectedDay!.year &&
            date.month == selectedDay!.month &&
            date.day == selectedDay!.day;
      },
    );
  }

  Color _getBorderColor(double? completion) {
    if (completion == null) return Colors.transparent;
    if (completion <= 20) return Colors.red;
    if (completion <= 40) return Colors.orange;
    if (completion <= 60) return Colors.yellow;
    if (completion <= 80) return Colors.green;
    return Colors.blue;
  }

  // 점을 그리는 함수
  Widget _buildDots(DateTime date) {
    List<Widget> dots = [];
    opusList?.where((opus) => isSameDay(opus.date, date)).forEach((opus) {
      dots.add(
        Container(
          width: 8.0,
          height: 8.0,
          margin: EdgeInsets.symmetric(horizontal: 1.0),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: opus.subjectColor,
          ),
        ),
      );
    });
    return Row(mainAxisSize: MainAxisSize.min, children: dots);
  }
}
