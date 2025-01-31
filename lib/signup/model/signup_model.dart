import 'package:json_annotation/json_annotation.dart';

part 'signup_model.g.dart';

@JsonSerializable()
class SignupModel {
  final String userName;
  final String phoneNumber;
  final DateTime birth;
  final String email;
  final String password;
  final String school;
  final String role;
  final String studentName;
  final int grade;

  SignupModel({
    required this.userName,
    required this.phoneNumber,
    required this.birth,
    required this.email,
    required this.password,
    required this.school,
    required this.role,
    required this.studentName,
    required this.grade,
  });

  factory SignupModel.fromJson(Map<String, dynamic> json) =>
      _$SignupModelFromJson(json);

  Map<String, dynamic> toJson() => _$SignupModelToJson(this);
}
