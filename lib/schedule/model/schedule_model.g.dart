// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'schedule_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ScheduleModel _$ScheduleModelFromJson(Map<String, dynamic> json) =>
    ScheduleModel(
      id: json['id'] as int,
      content: json['content'] as String,
      subject: json['subject'] as String? ?? '과목',
      date: DateTime.parse(json['date'] as String),
      time: json['time'] as int,
      completion: (json['completion'] as num).toDouble(),
    );

Map<String, dynamic> _$ScheduleModelToJson(ScheduleModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'content': instance.content,
      'subject': instance.subject,
      'date': instance.date.toIso8601String(),
      'time': instance.time,
      'completion': instance.completion,
    };
