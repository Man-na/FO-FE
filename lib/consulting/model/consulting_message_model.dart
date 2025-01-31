import 'package:json_annotation/json_annotation.dart';
import 'consulting_message_comment_model.dart';

part 'consulting_message_model.g.dart';

@JsonSerializable()
class ConsultingMessageModel {
  int consultingId;
  String consultant;
  String student;
  int grade;
  bool isRead;
  String className;
  String content;
  DateTime startDate;
  DateTime endDate;
  DateTime createdAt;
  List<ConsultingMessageCommentModel> comments;

  ConsultingMessageModel({
    required this.consultingId,
    required this.consultant,
    required this.student,
    required this.grade,
    required this.isRead,
    required this.className,
    required this.content,
    required this.startDate,
    required this.endDate,
    required this.createdAt,
    required this.comments, 
  });

  factory ConsultingMessageModel.fromJson(Map<String, dynamic> json) =>
      _$ConsultingMessageModelFromJson(json);

  Map<String, dynamic> toJson() => _$ConsultingMessageModelToJson(this);
}
