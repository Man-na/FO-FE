import 'package:json_annotation/json_annotation.dart';

part 'notification_model.g.dart';

@JsonSerializable()
class NotificationModel {
  final int notificationId;
  final bool isRead;
  final String title;
  final String content;
  final DateTime createdAt;

  NotificationModel({
    required this.notificationId,
    required this.isRead,
    required this.title,
    required this.content,
    required this.createdAt,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) =>
      _$NotificationModelFromJson(json);

  Map<String, dynamic> toJson() => _$NotificationModelToJson(this);
}
