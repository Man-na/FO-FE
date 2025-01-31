import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'mock_test_score_model.g.dart';

@JsonSerializable()
class MockTestScoreModel {
  int? id;
  int? subject;
  int month;
  int originalScore;
  int standardScore;
  double percentage;
  int rank;
  int? grade;

  @JsonKey(ignore: true)
  TextEditingController monthController;
  @JsonKey(ignore: true)
  TextEditingController originalScoreController;
  @JsonKey(ignore: true)
  TextEditingController standardScoreController;
  @JsonKey(ignore: true)
  TextEditingController percentageController;
  @JsonKey(ignore: true)
  TextEditingController rankController;

  MockTestScoreModel({
    this.id,
    this.subject,
    this.month = 0,
    this.originalScore = 0,
    this.standardScore = 0,
    this.percentage = 0.0,
    this.rank = 0,
    this.grade,
  })  : monthController =
            TextEditingController(text: month > 0 ? month.toString() : ''),
        originalScoreController = TextEditingController(
            text: originalScore > 0 ? originalScore.toString() : ''),
        standardScoreController = TextEditingController(
            text: standardScore > 0 ? standardScore.toString() : ''),
        percentageController = TextEditingController(
            text: percentage > 0 ? percentage.toString() : ''),
        rankController =
            TextEditingController(text: rank > 0 ? rank.toString() : '');

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'month': month,
      'subject': subject,
      'originalScore': originalScore,
      'standardScore': standardScore,
      'percentage': percentage,
      'rank': rank,
      'grade': grade,
    };
  }

  factory MockTestScoreModel.fromJson(Map<String, dynamic> json) =>
      _$MockTestScoreModelFromJson(json);

  Map<String, dynamic> toJson() => _$MockTestScoreModelToJson(this);
}
