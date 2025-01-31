// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'school_test_score_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SchoolTestScoreModel _$SchoolTestScoreModelFromJson(
        Map<String, dynamic> json) =>
    SchoolTestScoreModel(
      id: json['id'] as int?,
      subject: json['subject'] as String? ?? '',
      classHours: json['classHours'] as int? ?? 0,
      score: json['score'] as int? ?? 0,
      rank: json['rank'] as int? ?? 0,
      totalStudent: json['totalStudent'] as int? ?? 0,
      grade: json['grade'] as int?,
      testType: json['testType'] as int?,
    );

Map<String, dynamic> _$SchoolTestScoreModelToJson(
        SchoolTestScoreModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'subject': instance.subject,
      'classHours': instance.classHours,
      'score': instance.score,
      'rank': instance.rank,
      'totalStudent': instance.totalStudent,
      'grade': instance.grade,
      'testType': instance.testType,
    };
