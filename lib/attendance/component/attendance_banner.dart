import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';

class AttendanceBanner extends StatefulWidget {
  final DateTime selectedDay;

  const AttendanceBanner({
    required this.selectedDay,
    Key? key,
  }) : super(key: key);

  @override
  _OpusBannerState createState() => _OpusBannerState();
}

class _OpusBannerState extends State<AttendanceBanner> {

  @override
  Widget build(BuildContext context) {
    const textStyle = TextStyle(fontWeight: FontWeight.w600, color: Colors.white);

    return Container(
      color: PRIMARY_COLOR,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '${widget.selectedDay.year}년 ${widget.selectedDay.month}월 ${widget.selectedDay.day}일',
              style: textStyle,
            ),

          ],
        ),
      ),
    );
  }
}
