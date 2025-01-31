import 'package:json_annotation/json_annotation.dart';

part 'check_email_model.g.dart';

@JsonSerializable()
class CheckEmailModel {
  final bool isEmailAvailable;

  CheckEmailModel({required this.isEmailAvailable});

  factory CheckEmailModel.fromJson(Map<String, dynamic> json) =>
      _$CheckEmailModelFromJson(json);

  Map<String, dynamic> toJson() => _$CheckEmailModelToJson(this);
}
