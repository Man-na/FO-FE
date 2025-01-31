import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:intl/intl.dart';

class AttendanceCard extends StatelessWidget {
  final String title;
  final DateTime time;

  const AttendanceCard({
    required this.title,
    required this.time,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
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
            children: [
              _Content(
                title: title,
              ),
              const SizedBox(width: 16.0),
              _Time(time: time),
              const SizedBox(width: 16.0),
            ],
          ),
        ),
      ),
    );
  }
}

class _Time extends StatelessWidget {
  final DateTime time;

  const _Time({
    required this.time,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const textStyle = TextStyle(
      fontWeight: FontWeight.w600,
      color: PRIMARY_COLOR,
      fontSize: 12.0,
    );

    DateTime localTime = time.toLocal();
    String formattedTime = DateFormat('MM월 dd일 HH시 mm분').format(localTime);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          formattedTime,
          style: textStyle,
        ),
      ],
    );
  }
}

class _Content extends StatelessWidget {
  final String title;

  const _Content({
    required this.title,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: TextStyle(
          color: title == '등원' ? Colors.green : Colors.red,
          fontWeight: FontWeight.w600),
    );
  }
}
