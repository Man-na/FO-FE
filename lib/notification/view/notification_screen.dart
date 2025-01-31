import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:bluewhale_link/notification/model/notification_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bluewhale_link/notification/provider/notification_provider.dart';
import 'package:intl/intl.dart';

class NotificationScreen extends ConsumerStatefulWidget {
  const NotificationScreen({super.key});

  @override
  _NotificationScreenState createState() => _NotificationScreenState();
}

class _NotificationScreenState extends ConsumerState<NotificationScreen> {
  @override
  void initState() {
    super.initState();
    ref.read(notificationProvider.notifier).fetchNotifications();
  }

  @override
  Widget build(BuildContext context) {
    final notifications = ref.watch(notificationProvider);
    bool isTablet = MediaQuery.of(context).size.width > 600;

    return DefaultLayout(
      title: '공지사항',
      child: Column(
        children: [
          _buildHeaderRow(context),
          Expanded(
            child: notifications.isEmpty
                ? const Center(child: Text('공지사항이 없습니다.'))
                : ListView.builder(
                    itemCount: notifications.length,
                    itemBuilder: (BuildContext context, int index) {
                      final notification = notifications[index];
                      return InkWell(
                        onTap: () async {
                          if (!notification.isRead) {
                            await ref
                                .read(notificationProvider.notifier)
                                .markAsRead(notification.notificationId);
                          }
                          _showNotificationDialog(context, notification);
                        },
                        child: IntrinsicHeight(
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: <Widget>[
                              _buildListTileContent(
                                isTablet
                                    ? MediaQuery.of(context).size.width * 0.2
                                    : MediaQuery.of(context).size.width * 0.4,
                                Text(
                                  DateFormat('yy년 MM월 dd일').format(
                                    notification.createdAt.toLocal(),
                                  ),
                                  style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: isTablet ? 16.0 : 12.0,
                                  ),
                                ),
                              ),
                              _buildListTileContent(
                                MediaQuery.of(context).size.width * 0.2,
                                Text(
                                  notification.isRead ? '' : 'New!',
                                  style: TextStyle(
                                    color: Colors.red,
                                    fontWeight: FontWeight.w600,
                                    fontSize: isTablet ? 16.0 : 12.0,
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Container(
                                  alignment: Alignment.centerLeft,
                                  decoration: const BoxDecoration(
                                    border: Border(
                                      bottom: BorderSide(
                                        color: Colors.grey,
                                        width: 1.0,
                                      ),
                                    ),
                                  ),
                                  child: Text(
                                    notification.title,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontWeight: FontWeight.w600,
                                      fontSize: isTablet ? 16.0 : 12.0,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildListTileContent(double width, Widget child) {
    return Container(
      width: width,
      height: 40,
      alignment: Alignment.center,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Colors.grey,
            width: 1.0,
          ),
        ),
      ),
      child: child,
    );
  }

  Widget _buildHeaderRow(BuildContext context) {
    bool isTablet = MediaQuery.of(context).size.width > 600;
    return Container(
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Colors.grey, width: 1.0)),
      ),
      child: Row(
        children: [
          _buildHeaderItem(context, '수신 일자', isTablet ? 0.2 : 0.4),
          _buildHeaderItem(context, '확인 여부', 0.2),
          _buildHeaderItem(context, '제목', null),
        ],
      ),
    );
  }

  Widget _buildHeaderItem(
      BuildContext context, String text, double? widthFactor) {
    bool isTablet = MediaQuery.of(context).size.width > 600;

    return SizedBox(
      width: widthFactor != null
          ? MediaQuery.of(context).size.width * widthFactor
          : null,
      height: 40,
      child: Center(
        child: Text(
          text,
          style: TextStyle(
              fontSize: isTablet ? 16 : 12, fontWeight: FontWeight.w600),
        ),
      ),
    );
  }

  void _showNotificationDialog(
      BuildContext context, NotificationModel notification) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(notification.title),
          content: Text(notification.content),
          actions: <Widget>[
            TextButton(
              child: const Text('닫기'),
              onPressed: () => Navigator.of(context).pop(),
            ),
          ],
        );
      },
    );
  }
}
