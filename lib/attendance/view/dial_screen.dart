import 'package:flutter/material.dart';
import 'package:bluewhale_link/attendance/repository/attendance_repository.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class DialScreen extends ConsumerStatefulWidget {
  const DialScreen({super.key});

  @override
  ConsumerState<DialScreen> createState() => _DialScreenState();
}

class _DialScreenState extends ConsumerState<DialScreen> {
  String enteredNumbers = '';

  void _onDialButtonPressed(String number) {
    setState(() {
      enteredNumbers += number;
    });
  }

  void _clearNumbers() {
    setState(() {
      enteredNumbers = '';
    });
  }

  void _deleteLastEntry() {
    setState(() {
      enteredNumbers = enteredNumbers.substring(0, enteredNumbers.length - 1);
    });
  }

  void _sendAttendance(String type) async {
    final attendanceRepository = ref.read(attendanceRepositoryProvider);

    Map<String, dynamic> data = {
      'privateNumber': enteredNumbers,
      'onLink': type == '등원'
    };

    try {
      await attendanceRepository.createAttendance(data);
      _clearNumbers();
      print("출석 데이터 전송 성공: $data");
    } catch (e) {
      print("출석 데이터 전송 실패: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    bool isTablet = MediaQuery.of(context).size.width > 600;

    return DefaultLayout(
      title: '출석 체크',
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              enteredNumbers,
              style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: isTablet? MediaQuery.of(context).size.width * 0.6: MediaQuery.of(context).size.width * 0.8,
              child: _buildDialPad(),
            ),
            const SizedBox(height: 20),
            _buildAttendanceButtons(),
          ],
        ),
      ),
    );
  }

  Widget _buildDialPad() {
    bool isTablet = MediaQuery.of(context).size.width > 600;
    double fontSize = isTablet ? 40 : 20;
    return Container(
      padding: const EdgeInsets.all(10),
      child: GridView.count(
        shrinkWrap: true,
        crossAxisCount: 3,
        mainAxisSpacing: 10,
        crossAxisSpacing: 10,
        children: List.generate(12, (index) {
          String buttonText;
          VoidCallback? buttonAction;

          if (index < 9) {
            buttonText = (index + 1).toString();
            buttonAction = () => _onDialButtonPressed(buttonText);
          } else if (index == 9) {
            buttonText = 'AC';
            buttonAction = _clearNumbers;
          } else if (index == 10) {
            buttonText = '0';
            buttonAction = () => _onDialButtonPressed(buttonText);
          } else {
            buttonText = 'X';
            buttonAction = _deleteLastEntry;
          }

          return ElevatedButton(
            onPressed: buttonAction,
            style: ElevatedButton.styleFrom(
              backgroundColor: PRIMARY_COLOR,
            ),
            child: Text(
              buttonText,
              style: TextStyle(
                fontSize: fontSize,
                color: Colors.white,
              ),
            ),
          );
        }),
      ),
    );
  }

  Widget _buildAttendanceButtons() {
    return SizedBox(
      width:  MediaQuery.of(context).size.width * 0.6,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Expanded(
            child: ElevatedButton(
              onPressed: () => _sendAttendance("등원"),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                textStyle: const TextStyle(fontSize: 24.0, color: Colors.white),
                padding: const EdgeInsets.symmetric(vertical: 16.0),
              ),
              child: const Text(
                '등원',
                style:
                    TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
              ),
            ),
          ),
          const SizedBox(width: 8.0),
          Expanded(
            child: ElevatedButton(
              onPressed: () => _sendAttendance("하원"),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                padding: const EdgeInsets.symmetric(vertical: 16.0),
                textStyle: const TextStyle(fontSize: 24.0, color: Colors.white),
              ),
              child: const Text(
                '하원',
                style:
                    TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
