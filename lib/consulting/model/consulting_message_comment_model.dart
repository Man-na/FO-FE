import 'package:json_annotation/json_annotation.dart';

part 'consulting_message_comment_model.g.dart';

@JsonSerializable()
class ConsultingMessageCommentModel {
  int consultingCommentId;
  int consultingId;
  int userId;
  String userName;
  String profileUrl;
  String content;
  DateTime createdAt;

  ConsultingMessageCommentModel({
    required this.consultingCommentId,
    required this.consultingId,
    required this.userId,
    required this.userName,
    required this.profileUrl,
    required this.content,
    required this.createdAt,
  });

  factory ConsultingMessageCommentModel.fromJson(Map<String, dynamic> json) =>
      _$ConsultingMessageCommentModelFromJson(json);

  Map<String, dynamic> toJson() => _$ConsultingMessageCommentModelToJson(this);
}
