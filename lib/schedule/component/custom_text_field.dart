import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:bluewhale_link/common/const/colors.dart';

class CustomTextField extends StatelessWidget {
  final String label;
  final String initialValue;

  // true - 시간, false - 내용
  final bool isTime;
  final FormFieldSetter<String> onSaved;

  const CustomTextField({
    required this.label,
    required this.isTime,
    required this.onSaved,
    required this.initialValue,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4.0),
          child: Text(
            label,
            style: const TextStyle(
              color: PRIMARY_COLOR,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        const SizedBox(height: 4.0),
        if (isTime) renderTextField(),
        if (!isTime) Expanded(child: renderTextField())
      ],
    );
  }

  Widget renderTextField() {
    return TextFormField(
      onSaved: onSaved,
      textAlign: isTime ? TextAlign.start : TextAlign.left,
      textAlignVertical: isTime ? TextAlignVertical.center : TextAlignVertical.top,
      validator: (String? val) {
        if (val == null || val.isEmpty) {
          return '값을 입력해주세요.';
        }
        if (isTime) {
          int time = int.parse(val);

          if (time < 0) {
            return '0 이상의 숫자를 입력해주세요.';
          }

          if (time > 24) {
            return '24 미만의 숫자를 입력해주세요.';
          }
        }
        return null;
      },
      cursorColor: Colors.grey,
      maxLines: isTime ? 1 : null,
      expands: !isTime,
      keyboardType: isTime ? TextInputType.number : TextInputType.multiline,
      inputFormatters: isTime
          ? [
              FilteringTextInputFormatter.digitsOnly,
            ]
          : [],
      initialValue: initialValue,
      decoration: InputDecoration(
        suffixText: isTime ? '시' : null,
        contentPadding:
            const EdgeInsets.symmetric(vertical: 12.0, horizontal: 16.0),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15.0),
          borderSide: const BorderSide(color: Colors.grey, width: 1.6),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15.0),
          borderSide: const BorderSide(color: PRIMARY_COLOR, width: 1.6),
        ),
        filled: true,
        fillColor: Colors.grey[300],
      ),
    );
  }
}
