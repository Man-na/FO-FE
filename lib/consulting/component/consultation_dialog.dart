import 'package:flutter/material.dart';
import 'package:bluewhale_link/consulting/model/consulting_message_model.dart';
import 'package:bluewhale_link/consulting/provider/consulting_message_provider.dart';
import 'package:bluewhale_link/consulting/repository/consulting_message_comment_repository.dart';
import 'package:bluewhale_link/user/provider/user_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

class ConsultationDialog extends ConsumerWidget {
  final int consultingId;

  const ConsultationDialog({Key? key, required this.consultingId})
      : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    TextEditingController commentController = TextEditingController();
    bool isTablet = MediaQuery.of(context).size.width > 500;

    final commentRepository =
        ref.read(consultingMessageCommentRepositoryProvider);
    final consultingMessagesNotifier =
        ref.read(consultingMessageProvider.notifier);
    final currentUser = ref.watch(userProvider);

    final ConsultingMessageModel? consultingMessage =
        ref.watch(consultingMessageProvider).firstWhere(
              (message) => message.consultingId == consultingId,
            );

    if (consultingMessage == null) {
      return AlertDialog(
        title: Text('컨설팅 정보를 불러올 수 없습니다'),
        actions: <Widget>[
          TextButton(
            child: Text('닫기'),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      );
    }

    return AlertDialog(
      title: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '${DateFormat('yyyy-MM-dd').format(consultingMessage.startDate)} ~ ${DateFormat('MM-dd').format(consultingMessage.endDate)}',
            style: TextStyle(
              fontSize: isTablet ? 20 : 12,
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            'Consultant ${consultingMessage.consultant}',
            style: TextStyle(
              fontSize: isTablet ? 20 : 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
      content: Container(
        width: MediaQuery.of(context).size.width * 0.8,
        height: MediaQuery.of(context).size.height * 0.6,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  consultingMessage.content,
                  textAlign: TextAlign.start,
                  style: TextStyle(
                    fontSize: isTablet ? 20 : 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 10),
              Divider(),
              ...consultingMessage.comments.map((comment) {
                final isCurrentUser = comment.userId == currentUser.userId;
                final localCreatedAt = comment.createdAt.toLocal();
                final formattedDate =
                    DateFormat('yyyy-MM-dd HH:mm').format(localCreatedAt);
                return Column(
                  children: [
                    Row(
                      mainAxisAlignment: isCurrentUser
                          ? MainAxisAlignment.end
                          : MainAxisAlignment.start,
                      children: [
                        if (!isCurrentUser) // 현재 사용자가 아닐 때 왼쪽에 프로필 사진 표시
                          CircleAvatar(
                            backgroundImage: (comment.profileUrl != null &&
                                    comment.profileUrl!.isNotEmpty)
                                ? NetworkImage(comment.profileUrl!)
                                    as ImageProvider<Object>
                                : AssetImage(
                                        'asset/img/misc/user_placeholder.png')
                                    as ImageProvider<Object>,
                            radius: isTablet ? 20.0 : 12.0,
                          ),
                        SizedBox(width: 8),
                        Flexible(
                          child: Container(
                            padding: EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: isCurrentUser
                                  ? Colors.yellow[200]
                                  : Colors.blue[100],
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              comment.content,
                              style: TextStyle(fontSize: isTablet ? 20 : 12),
                            ),
                          ),
                        ),
                        if (isCurrentUser) SizedBox(width: 8),
                        if (isCurrentUser) // 현재 사용자일 때 오른쪽에 프로필 사진 표시
                          CircleAvatar(
                            backgroundImage: (comment.profileUrl != null &&
                                    comment.profileUrl!.isNotEmpty)
                                ? NetworkImage(comment.profileUrl!)
                                    as ImageProvider<Object>
                                : AssetImage(
                                        'asset/img/misc/user_placeholder.png')
                                    as ImageProvider<Object>,
                            radius: isTablet ? 24.0 : 12.0,
                          ),
                      ],
                    ),
                    Padding(
                      padding: EdgeInsets.only(top: 4, bottom: 8),
                      child: Align(
                        alignment: isCurrentUser
                            ? Alignment.bottomRight
                            : Alignment.bottomLeft,
                        child: Text(
                          formattedDate,
                          style: TextStyle(
                            fontSize: isTablet ? 12 : 10,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              }).toList(),
            ],
          ),
        ),
      ),
      actions: <Widget>[
        Container(
          height: 40,
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: commentController,
                  decoration: InputDecoration(
                    labelText: '댓글을 작성해주세요.',
                    labelStyle: TextStyle(fontSize: 12),
                    border: OutlineInputBorder(),
                  ),
                  style: TextStyle(fontSize: 12),
                ),
              ),
              IconButton(
                icon: Icon(Icons.send),
                onPressed: () async {
                  final content = commentController.text;
                  if (content.isNotEmpty) {
                    try {
                      await commentRepository.createConsultingComment(
                        consultingId,
                        {'content': content},
                      );
                      commentController.clear();
                      consultingMessagesNotifier.fetchConsultingMessages();
                    } catch (e) {
                      print(e);
                    }
                  }
                },
              ),
            ],
          ),
        ),
        TextButton(
          child: Text('닫기'),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ],
    );
  }
}
