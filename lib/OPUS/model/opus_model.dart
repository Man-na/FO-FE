import 'dart:ui';
import 'package:json_annotation/json_annotation.dart';

part 'opus_model.g.dart';

@JsonSerializable()
class OpusModel {
  final int id;
  final int teacherId;
  final DateTime date;
  final String title;
  final String? content;
  final String? opusUrl;
  final String? fileUrl0;
  final String? fileName0;
  final String? fileUrl1;
  final String? fileName1;
  final String? fileUrl2;
  final String? fileName2;
  final int grade;
  final String className;
  final int time;
  final int subjectId;
  @JsonKey(ignore: true)
  final Color subjectColor;
  @JsonKey(name: 'subjectColor')
  final String subjectColorHex;

  OpusModel({
    required this.id,
    required this.teacherId,
    required this.date,
    required this.title,
    this.content,
    this.opusUrl,
    this.fileUrl0,
    this.fileName0,
    this.fileUrl1,
    this.fileName1,
    this.fileUrl2,
    this.fileName2,
    required this.grade,
    required this.className,
    required this.time,
    required this.subjectId,
    required this.subjectColorHex,
  }) : subjectColor = Color(int.parse('FF$subjectColorHex', radix: 16));

  factory OpusModel.fromJson(Map<String, dynamic> json) =>
      _$OpusModelFromJson(json);

  Map<String, dynamic> toJson() => _$OpusModelToJson(this);
}
