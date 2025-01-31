import 'package:json_annotation/json_annotation.dart';

part 'attendance_model.g.dart';

@JsonSerializable()
class AttendanceModel {
  final int attendanceId;
  final bool onLink;
  final DateTime createdAt;

  AttendanceModel({
    required this.attendanceId,
    required this.onLink,
    required this.createdAt,
  });

  factory AttendanceModel.fromJson(Map<String, dynamic> json) =>
      _$AttendanceModelFromJson(json);

  Map<String, dynamic> toJson() => _$AttendanceModelToJson(this);
}
