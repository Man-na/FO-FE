import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable()
class UserModel {
  final int userId;
  final String userName;
  final int grade;
  final String className;
  final String role;
  final String? profileUrl;
  final String? motto;
  final bool? isAccepted;
  final int? studentId;

  UserModel({
    required this.userId,
    required this.userName,
    required this.grade,
    required this.className,
    required this.role,
    this.profileUrl,
    this.motto,
    this.isAccepted,
    this.studentId,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  UserModel copyWith({
    int? userId,
    String? userName,
    int? grade,
    String? className,
    String? role,
    String? profileUrl,
    String? motto,
    bool? isAccepted,
    int? studentId,
  }) {
    return UserModel(
      userId: userId ?? this.userId,
      userName: userName ?? this.userName,
      grade: grade ?? this.grade,
      className: className ?? this.className,
      role: role ?? this.role,
      profileUrl: profileUrl ?? this.profileUrl,
      motto: motto ?? this.motto,
      isAccepted: isAccepted ?? this.isAccepted,
      studentId: studentId ?? this.studentId,
    );
  }
}
