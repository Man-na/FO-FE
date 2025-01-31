// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'consulting_message_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConsultingMessageModel _$ConsultingMessageModelFromJson(
        Map<String, dynamic> json) =>
    ConsultingMessageModel(
      consultingId: json['consultingId'] as int,
      consultant: json['consultant'] as String,
      student: json['student'] as String,
      grade: json['grade'] as int,
      isRead: json['isRead'] as bool,
      className: json['className'] as String,
      content: json['content'] as String,
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      createdAt: DateTime.parse(json['createdAt'] as String),
      comments: (json['comments'] as List<dynamic>)
          .map((e) =>
              ConsultingMessageCommentModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$ConsultingMessageModelToJson(
        ConsultingMessageModel instance) =>
    <String, dynamic>{
      'consultingId': instance.consultingId,
      'consultant': instance.consultant,
      'student': instance.student,
      'grade': instance.grade,
      'isRead': instance.isRead,
      'className': instance.className,
      'content': instance.content,
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'createdAt': instance.createdAt.toIso8601String(),
      'comments': instance.comments,
    };
