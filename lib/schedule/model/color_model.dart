import 'package:json_annotation/json_annotation.dart';

part 'color_model.g.dart';

@JsonSerializable()
class ColorModel {
  final int subjectId;
  final String subjectColor;

  ColorModel({
    required this.subjectId,
    required this.subjectColor,
  });

  factory ColorModel.fromJson(Map<String, dynamic> json) =>
      _$ColorModelFromJson(json);
}
