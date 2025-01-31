// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'consulting_message_comment_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConsultingMessageCommentModel _$ConsultingMessageCommentModelFromJson(
        Map<String, dynamic> json) =>
    ConsultingMessageCommentModel(
      consultingCommentId: json['consultingCommentId'] as int,
      consultingId: json['consultingId'] as int,
      userId: json['userId'] as int,
      userName: json['userName'] as String,
      profileUrl: json['profileUrl'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$ConsultingMessageCommentModelToJson(
        ConsultingMessageCommentModel instance) =>
    <String, dynamic>{
      'consultingCommentId': instance.consultingCommentId,
      'consultingId': instance.consultingId,
      'userId': instance.userId,
      'userName': instance.userName,
      'profileUrl': instance.profileUrl,
      'content': instance.content,
      'createdAt': instance.createdAt.toIso8601String(),
    };
