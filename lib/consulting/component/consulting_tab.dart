import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';

class Message {
  final String userId;
  final String text;
  final String profileUrl;
  final DateTime createdAt;

  Message({
    required this.userId,
    required this.text,
    required this.profileUrl,
    required this.createdAt,
  });
}

class ConsultingTab extends StatefulWidget {
  const ConsultingTab({Key? key}) : super(key: key);

  @override
  _ConsultingTabState createState() => _ConsultingTabState();
}

class _ConsultingTabState extends State<ConsultingTab> {
  final List<Message> messages = [
    Message(
      userId: 'myUserId',
      text: '안녕하세요!',
      profileUrl:
          'https://mys3image.s3.ap-northeast-2.amazonaws.com/1693910238231_dev-jeans.png',
      createdAt: DateTime.now(),
    ),
    Message(
      userId: 'otherUserId',
      text: '안녕하세요! 어떻게 도와드릴까요?',
      profileUrl:
          'https://mys3image.s3.ap-northeast-2.amazonaws.com/bluewhalelink+(1).png',
      createdAt: DateTime.now(),
    ),
    Message(
      userId: 'myUserId',
      text: '상담 신청하려고 해요!',
      profileUrl:
          'https://mys3image.s3.ap-northeast-2.amazonaws.com/1693910238231_dev-jeans.png',
      createdAt: DateTime.now(),
    ),
  ];

  final TextEditingController messageController = TextEditingController();
  final String currentUserId = 'myUserId';

  void sendMessage() {
    if (messageController.text.isNotEmpty) {
      setState(() {
        messages.add(Message(
          userId: currentUserId,
          text: messageController.text,
          profileUrl:
              'https://mys3image.s3.ap-northeast-2.amazonaws.com/1693910238231_dev-jeans.png',
          createdAt: DateTime.now(),
        ));
        messageController.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultLayout(
      title: '컨설팅',
      child: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: ListView.builder(
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    bool isCurrentUser =
                        messages[index].userId == currentUserId;
                    return Row(
                      mainAxisAlignment: isCurrentUser
                          ? MainAxisAlignment.end
                          : MainAxisAlignment.start,
                      children: [
                        if (!isCurrentUser)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 4.0),
                            child: CircleAvatar(
                              backgroundImage:
                                  NetworkImage(messages[index].profileUrl),
                              radius: 16,
                            ),
                          ),
                        Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Text(messages[index].text),
                        ),
                        if (isCurrentUser)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 4.0),
                            child: CircleAvatar(
                              backgroundImage:
                                  NetworkImage(messages[index].profileUrl),
                              radius: 16,
                            ),
                          ),
                      ],
                    );
                  },
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 8.0),
              child: Row(
                children: [
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8.0),
                      child: TextField(
                        controller: messageController,
                        style: TextStyle(fontSize: 14.0),
                        decoration: InputDecoration(
                          hintText: '메시지를 입력해주세요',
                        ),
                      ),
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.send),
                    onPressed: sendMessage,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
