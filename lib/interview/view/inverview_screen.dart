import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/questions.dart';

class InterviewScreen extends StatefulWidget {
  const InterviewScreen({super.key});

  @override
  _InterviewScreenState createState() => _InterviewScreenState();
}

class _InterviewScreenState extends State<InterviewScreen> {
  final List<int> _scores = List.filled(40, 0);
  final Map<int, TextEditingController> _textControllers = {};
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    for (int i = 35; i < questions.length; i++) {
      _textControllers[i] = TextEditingController();
    }
  }

  @override
  void dispose() {
    _textControllers.forEach((key, controller) {
      controller.dispose();
    });
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView(
              children: <Widget>[
                for (int i = 0; i < 5; i++)
                  if ((i + _currentPage * 5) < questions.length)
                    _buildQuestion(i + _currentPage * 5),
              ],
            ),
          ),
          Padding(
            padding:
                const EdgeInsets.symmetric(horizontal: 8.0, vertical: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (_currentPage > 0)
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _currentPage--;
                      });
                    },
                    child: const Text('이전'),
                  ),
                const SizedBox(width: 16.0),
                if (_currentPage * 5 + 5 < questions.length)
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _currentPage++;
                      });
                    },
                    child: const Text('다음'),
                  ),
                if (_currentPage * 5 + 5 >= questions.length)
                  ElevatedButton(
                    onPressed: _submitSurvey,
                    child: const Text('제출하기'),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuestion(int questionIndex) {
    if (questionIndex >= 35) {
      // 마지막 5개 질문에 대한 처리
      return _buildTextFieldQuestion(questionIndex);
    } else {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              questions[questionIndex],
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              for (int score = 1; score <= 5; score++)
                Radio<int>(
                  value: score,
                  groupValue: _scores[questionIndex],
                  onChanged: (int? value) {
                    if (value != null) {
                      setState(() {
                        _scores[questionIndex] = value;
                      });
                    }
                  },
                ),
            ],
          ),
        ],
      );
    }
  }

  void _submitSurvey() {
    for (int i = 0; i < _scores.length; i++) {
      if (_scores[i] == 0) {
        _showUnansweredDialog(i + 1);
        return;
      }
    }
    print("모든 설문 완료");
  }

  void _showUnansweredDialog(int questionNumber) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('미응답 설문 알림'),
          content: Text('$questionNumber번 질문에 응답해주세요!'),
          actions: <Widget>[
            TextButton(
              child: const Text('확인'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  Widget _buildTextFieldQuestion(int questionIndex) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            questions[questionIndex],
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        TextField(
          controller: _textControllers[questionIndex],
          decoration: const InputDecoration(
            hintText: '답변을 작성해주세요.',
          ),
        ),
      ],
    );
  }
}
