import 'package:flutter/material.dart';
import 'package:bluewhale_link/attendance/model/attendance_model.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:table_calendar/table_calendar.dart';

class Calendar extends StatelessWidget {
  final DateTime? selectedDay;
  final DateTime focusedDay;
  final OnDaySelected? onDaySelected;
  final List<AttendanceModel> attendanceList;

  const Calendar({
    required this.selectedDay,
    required this.focusedDay,
    required this.onDaySelected,
    required this.attendanceList,
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
        cellMargin: const EdgeInsets.all(4.0),
      ),
      calendarBuilders: CalendarBuilders(
        defaultBuilder: (context, date, _) {
          var attendances = _getAttendancesForDate(date);
          return _buildDateCell(date, attendances);
        },
        selectedBuilder: (context, date, _) {
          var attendances = _getAttendancesForDate(date);
          return _buildDateCell(date, attendances, isSelected: true);
        },
      ),
      daysOfWeekStyle: const DaysOfWeekStyle(
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


  List<AttendanceModel> _getAttendancesForDate(DateTime date) {
    return attendanceList.where((attendance) {
      DateTime attendanceDate = attendance.createdAt;
      return date.year == attendanceDate.year &&
          date.month == attendanceDate.month &&
          date.day == attendanceDate.day;
    }).toList();
  }


  Widget _buildDateCell(DateTime date, List<AttendanceModel> attendances, {bool isSelected = false}) {
    return Padding(
      padding: const EdgeInsets.all(4.0),
      child: Container(
        height: 64.0,
        width: 64.0,
        decoration: BoxDecoration(
          border: isSelected ? Border.all(color: PRIMARY_COLOR, width: 1.0) : null,
          borderRadius: BorderRadius.circular(6.0),
          color: isSelected ? Colors.white : null,
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Text(
              '${date.day}',
              style: TextStyle(
                color: isSelected ? PRIMARY_COLOR : Colors.grey[600],
                fontWeight: FontWeight.w700,
                fontSize: 14.0,
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 4.0),
                child: _buildDots(attendances),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDots(List<AttendanceModel> attendances) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: attendances.map((attendance) {
        return Container(
          width: 6.0,
          height: 6.0,
          margin: const EdgeInsets.symmetric(horizontal: 1.0),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: attendance.onLink ? Colors.green : Colors.red,
          ),
        );
      }).toList(),
    );
  }
}
