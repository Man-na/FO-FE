// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserModel _$UserModelFromJson(Map<String, dynamic> json) => UserModel(
      userId: json['userId'] as int,
      userName: json['userName'] as String,
      grade: json['grade'] as int,
      className: json['className'] as String,
      role: json['role'] as String,
      profileUrl: json['profileUrl'] as String?,
      motto: json['motto'] as String?,
      isAccepted: json['isAccepted'] as bool?,
      studentId: json['studentId'] as int?,
    );

Map<String, dynamic> _$UserModelToJson(UserModel instance) => <String, dynamic>{
      'userId': instance.userId,
      'userName': instance.userName,
      'grade': instance.grade,
      'className': instance.className,
      'role': instance.role,
      'profileUrl': instance.profileUrl,
      'motto': instance.motto,
      'isAccepted': instance.isAccepted,
      'studentId': instance.studentId,
    };
