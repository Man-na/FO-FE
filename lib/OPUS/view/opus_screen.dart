import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:bluewhale_link/OPUS/component/opus_banner.dart';
import 'package:bluewhale_link/OPUS/component/opus_card.dart';
import 'package:bluewhale_link/OPUS/model/opus_model.dart';
import 'package:bluewhale_link/OPUS/provider/opus_provider.dart';
import 'package:bluewhale_link/OPUS/component/opus_calendar.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/user/provider/user_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

class OpusScreen extends ConsumerStatefulWidget {
  const OpusScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<OpusScreen> createState() => _OpusScreenState();
}

class _OpusScreenState extends ConsumerState<OpusScreen> {
  DateTime selectedDay = DateTime.utc(
    DateTime.now().year,
    DateTime.now().month,
    DateTime.now().day,
  );
  DateTime focusedDay = DateTime.now();

  @override
  Widget build(BuildContext context) {
    final opusList = ref.watch(opusProvider);
    final userData = ref.watch(userProvider);

    final filteredOpusList = opusList.where((opus) {
      return isSameDay(opus.date, selectedDay);
    }).toList();

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Container(
              height: 40.0,
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: PRIMARY_COLOR,
                    width: 1.0,
                  ),
                ),
              ),
              child: Center(
                child: Text(
                  userData.motto ?? '나의 목표',
                  style: TextStyle(
                    fontSize: 14.0,
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            Calendar(
              selectedDay: selectedDay,
              focusedDay: focusedDay,
              onDaySelected: onDaySelected,
              opusList: opusList,
            ),
            const SizedBox(height: 8.0),
            OpusBanner(selectedDay: selectedDay),
            const SizedBox(height: 8.0),
            _OpusList(opusList: filteredOpusList, selectedDate: selectedDay),
          ],
        ),
      ),
    );
  }

  onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      this.selectedDay = selectedDay;
      this.focusedDay = selectedDay;
    });
  }

  bool isSameDay(DateTime? date1, DateTime? date2) {
    return date1?.year == date2?.year &&
        date1?.month == date2?.month &&
        date1?.day == date2?.day;
  }
}

class _OpusList extends ConsumerWidget {
  final DateTime selectedDate;
  final List<OpusModel> opusList;

  const _OpusList({
    required this.selectedDate,
    required this.opusList,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (opusList.isEmpty) {
      return Expanded(child: Center(child: Text('스케줄이 없습니다.')));
    }

    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: ListView.separated(
          itemCount: opusList.length,
          separatorBuilder: (context, index) => const SizedBox(height: 8.0),
          itemBuilder: (context, index) {
            final opus = opusList[index];
            return _buildOpusItem(opus, context, selectedDate);
          },
        ),
      ),
    );
  }

  Widget _buildOpusItem(
      OpusModel opus, BuildContext context, DateTime selectedDate) {
    String getSubjectName(int subjectId) {
      switch (subjectId) {
        case 1:
          return '국어';
        case 2:
          return '영어';
        default:
          return '컨설팅';
      }
    }

    return Dismissible(
      key: ObjectKey(opus.id),
      direction: DismissDirection.endToStart,
      onDismissed: (DismissDirection direction) {
        // 삭제 로직
      },
      child: GestureDetector(
        onTap: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text(
                    '[${opus.time}] ${getSubjectName(opus.subjectId)} 고${opus.grade}${opus.className}'),
                content: SingleChildScrollView(
                  child: ListBody(
                    children: <Widget>[
                      Text(
                          '날짜: ${selectedDate.toLocal().toString().split(' ')[0]}'),
                      Text('과목: ${getSubjectName(opus.subjectId)}'),
                      Text('수강 대상: ${opus.grade}학년'),
                      Text('Class: ${opus.className}'),
                      Text('강의명: ${opus.title}'),
                      Text('내용: ${opus.content}'),
                      GestureDetector(
                        onTap: () {
                          if (opus.opusUrl != null) {
                            _launchURL(opus.opusUrl!);
                          }
                        },
                        child: RichText(
                          text: TextSpan(
                            style: TextStyle(color: Colors.black),
                            children: <TextSpan>[
                              TextSpan(text: '링크: '),
                              TextSpan(
                                text: opus.opusUrl ?? '링크 없음',
                                style: TextStyle(
                                  color: Colors.blue,
                                  decoration: TextDecoration.underline,
                                ),
                                recognizer: TapGestureRecognizer()
                                  ..onTap = () {
                                    if (opus.opusUrl != null) {
                                      final encodedUrl =
                                          Uri.encodeFull(opus.opusUrl!);
                                      _launchURL(encodedUrl);
                                    }
                                  },
                              ),
                            ],
                          ),
                        ),
                      ),
                      if (opus.fileName0 != "" ||
                          opus.fileName1 != "" ||
                          opus.fileName2 != "")
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(height: 10),
                            Text('첨부파일:'),
                            if (opus.fileName0 != "" &&
                                opus.fileName0!.isNotEmpty)
                              _buildFileLink(opus.fileName0!, opus.fileUrl0!),
                            if (opus.fileName1 != "" &&
                                opus.fileName1!.isNotEmpty)
                              _buildFileLink(opus.fileName1!, opus.fileUrl1!),
                            if (opus.fileName2 != "" &&
                                opus.fileName2!.isNotEmpty)
                              _buildFileLink(opus.fileName2!, opus.fileUrl2!),
                          ],
                        ),
                    ],
                  ),
                ),
                actions: <Widget>[
                  TextButton(
                    child: Text('닫기'),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              );
            },
          );
        },
        child: OpusCard(
            title:
                '[${opus.time}] ${getSubjectName(opus.subjectId)} 고${opus.grade}${opus.className}',
            color: opus.subjectColor,
            time: opus.time),
      ),
    );
  }

  Widget _buildFileLink(String fileName, String fileUrl) {
    return InkWell(
      onTap: () => _launchURL(fileUrl),
      child: Text(
        fileName,
        style: TextStyle(
          color: Colors.blue,
          decoration: TextDecoration.underline,
        ),
      ),
    );
  }

  void _launchURL(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      print('Could not launch $url');
    }
  }
}
