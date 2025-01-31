import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';

class OpusCard extends StatelessWidget {
  final String title;
  final Color color;
  final int time;

  const OpusCard({
    required this.title,
    required this.color,
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
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _Time(
               time: time
              ),
              const SizedBox(width: 16.0),
              _Content(
                title: title,
              ),
              const SizedBox(width: 16.0),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _Category(
                    color: color,
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}

class _Time extends StatelessWidget {
  final int time;

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

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$time교시',
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
    return Expanded(
      child: Text(title),
    );
  }
}

class _Category extends StatelessWidget {
  final Color color;

  const _Category({
    required this.color,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
      width: 16.0,
      height: 16.0,
    );
  }
}
