// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'opus_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

OpusModel _$OpusModelFromJson(Map<String, dynamic> json) => OpusModel(
      id: json['id'] as int,
      teacherId: json['teacherId'] as int,
      date: DateTime.parse(json['date'] as String),
      title: json['title'] as String,
      content: json['content'] as String?,
      opusUrl: json['opusUrl'] as String?,
      fileUrl0: json['fileUrl0'] as String?,
      fileName0: json['fileName0'] as String?,
      fileUrl1: json['fileUrl1'] as String?,
      fileName1: json['fileName1'] as String?,
      fileUrl2: json['fileUrl2'] as String?,
      fileName2: json['fileName2'] as String?,
      grade: json['grade'] as int,
      className: json['className'] as String,
      time: json['time'] as int,
      subjectId: json['subjectId'] as int,
      subjectColorHex: json['subjectColor'] as String,
    );

Map<String, dynamic> _$OpusModelToJson(OpusModel instance) => <String, dynamic>{
      'id': instance.id,
      'teacherId': instance.teacherId,
      'date': instance.date.toIso8601String(),
      'title': instance.title,
      'content': instance.content,
      'opusUrl': instance.opusUrl,
      'fileUrl0': instance.fileUrl0,
      'fileName0': instance.fileName0,
      'fileUrl1': instance.fileUrl1,
      'fileName1': instance.fileName1,
      'fileUrl2': instance.fileUrl2,
      'fileName2': instance.fileName2,
      'grade': instance.grade,
      'className': instance.className,
      'time': instance.time,
      'subjectId': instance.subjectId,
      'subjectColor': instance.subjectColorHex,
    };
