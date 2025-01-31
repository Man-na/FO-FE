// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'signup_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SignupModel _$SignupModelFromJson(Map<String, dynamic> json) => SignupModel(
      userName: json['userName'] as String,
      phoneNumber: json['phoneNumber'] as String,
      birth: DateTime.parse(json['birth'] as String),
      email: json['email'] as String,
      password: json['password'] as String,
      school: json['school'] as String,
      role: json['role'] as String,
      studentName: json['studentName'] as String,
      grade: json['grade'] as int,
    );

Map<String, dynamic> _$SignupModelToJson(SignupModel instance) =>
    <String, dynamic>{
      'userName': instance.userName,
      'phoneNumber': instance.phoneNumber,
      'birth': instance.birth.toIso8601String(),
      'email': instance.email,
      'password': instance.password,
      'school': instance.school,
      'role': instance.role,
      'studentName': instance.studentName,
      'grade': instance.grade,
    };
