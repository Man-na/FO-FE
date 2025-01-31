import 'package:flutter/material.dart';

class HeaderWidget extends StatelessWidget {
  final bool isTablet;

  const HeaderWidget({Key? key, required this.isTablet}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(32, 0, 32, 32),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text(
                  'Bluewhale LINK',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: isTablet ? 36.0 : 14.0,
                  ),
                ),
              ],
            ),
          ),
          Container(
            width: isTablet ? 200 : 100,
            child: Image.asset('asset/img/link/bluewhalelink_white.png'),
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text(
                  'Welcome',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: isTablet ? 36.0 : 14.0,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
