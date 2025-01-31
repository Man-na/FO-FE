import 'dart:ui';
import 'package:json_annotation/json_annotation.dart';

part 'schedule_model.g.dart';

@JsonSerializable()
class ScheduleModel {
  final int id;
  final String content;
  final String subject;
  final DateTime date;
  final int time;
  final double completion;

  ScheduleModel({
    required this.id,
    required this.content,
    this.subject = '과목',
    required this.date,
    required this.time,
    required this.completion,
  });

  factory ScheduleModel.fromJson(Map<String, dynamic> json) =>
      _$ScheduleModelFromJson(json);

  Map<String, dynamic> toJson() => _$ScheduleModelToJson(this);
}
