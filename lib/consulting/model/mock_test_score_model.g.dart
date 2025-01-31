// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mock_test_score_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MockTestScoreModel _$MockTestScoreModelFromJson(Map<String, dynamic> json) =>
    MockTestScoreModel(
      id: json['id'] as int?,
      subject: json['subject'] as int?,
      month: json['month'] as int? ?? 0,
      originalScore: json['originalScore'] as int? ?? 0,
      standardScore: json['standardScore'] as int? ?? 0,
      percentage: (json['percentage'] as num?)?.toDouble() ?? 0.0,
      rank: json['rank'] as int? ?? 0,
      grade: json['grade'] as int?,
    );

Map<String, dynamic> _$MockTestScoreModelToJson(MockTestScoreModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'subject': instance.subject,
      'month': instance.month,
      'originalScore': instance.originalScore,
      'standardScore': instance.standardScore,
      'percentage': instance.percentage,
      'rank': instance.rank,
      'grade': instance.grade,
    };
