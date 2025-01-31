import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'school_test_score_model.g.dart';

@JsonSerializable()
class SchoolTestScoreModel {
  int? id;
  String subject;
  int classHours;
  int score;
  int rank;
  int totalStudent;
  int? grade;
  int? testType;

  @JsonKey(ignore: true)
  TextEditingController subjectController;
  @JsonKey(ignore: true)
  TextEditingController classHoursController;
  @JsonKey(ignore: true)
  TextEditingController scoreController;
  @JsonKey(ignore: true)
  TextEditingController rankController;
  @JsonKey(ignore: true)
  TextEditingController totalStudentController;

  SchoolTestScoreModel({
    this.id,
    this.subject = '',
    this.classHours = 0,
    this.score = 0,
    this.rank = 0,
    this.totalStudent = 0,
    this.grade,
    this.testType,
  })  : subjectController = TextEditingController(text: subject),
        classHoursController = TextEditingController(
            text: classHours > 0 ? classHours.toString() : ''),
        scoreController =
            TextEditingController(text: score > 0 ? score.toString() : ''),
        rankController =
            TextEditingController(text: rank > 0 ? rank.toString() : ''),
        totalStudentController = TextEditingController(
            text: totalStudent > 0 ? totalStudent.toString() : '');

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'subject': subject,
      'classHours': classHours,
      'score': score,
      'rank': rank,
      'totalStudent': totalStudent,
      'grade': grade,
      'testType': testType
    };
  }


  factory SchoolTestScoreModel.fromJson(Map<String, dynamic> json) =>
      _$SchoolTestScoreModelFromJson(json);
}
