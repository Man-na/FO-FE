import 'package:flutter/material.dart';
import 'package:bluewhale_link/schedule/component/custom_text_field.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/schedule/model/color_model.dart';
import 'package:bluewhale_link/schedule/model/schedule_model.dart';
import 'package:bluewhale_link/schedule/provider/color_provider.dart';
import 'package:bluewhale_link/schedule/provider/schedule_provider.dart';
import 'package:bluewhale_link/schedule/repository/schedule_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:numberpicker/numberpicker.dart';

class ScheduleBottomSheet extends ConsumerStatefulWidget {
  final DateTime selectedDate;
  final int? scheduleId;
  final ScheduleModel? schedule;

  const ScheduleBottomSheet({
    required this.selectedDate,
    this.scheduleId,
    this.schedule,
    Key? key,
  }) : super(key: key);

  @override
  ConsumerState<ScheduleBottomSheet> createState() =>
      _ScheduleBottomSheetState();
}

class _ScheduleBottomSheetState extends ConsumerState<ScheduleBottomSheet> {
  final GlobalKey<FormState> formkey = GlobalKey();
  String? content;
  String? subject;
  double completion = 0;

  @override
  void initState() {
    super.initState();
    if (widget.schedule != null) {
      content = widget.schedule!.content;
      subject = widget.schedule!.subject;
      completion = widget.schedule!.completion;
    }
  }

  void setCompletion(double newCompletion) {
    setState(() {
      completion = newCompletion;
    });
  }

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(FocusNode());
      },
      child: SafeArea(
        child: Container(
          height: MediaQuery.of(context).size.height / 2 + bottomInset,
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20.0),
              topRight: Radius.circular(20.0),
            ),
          ),
          child: Padding(
            padding: EdgeInsets.only(
              bottom: bottomInset,
            ),
            child: Padding(
              padding:
                  const EdgeInsets.only(left: 16.0, right: 16.0, top: 16.0),
              child: Form(
                key: formkey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _Subject(
                        onSaved: (String? val) {
                          subject = val;
                        },
                        initialValue: subject ?? ""),
                    const SizedBox(height: 16.0),
                    _Content(
                      onSaved: (String? val) {
                        content = val;
                      },
                      initialValue: content ?? "",
                    ),
                    const SizedBox(height: 16.0),
                    _CompletionSlider(
                      completion: completion,
                      onCompletionChanged: setCompletion,
                    ),
                    const SizedBox(height: 8.0),
                    _SaveButton(
                      onPressed: onSavePressed,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  void onSavePressed() async {
    if (formkey.currentState == null) {
      return;
    }

    if (formkey.currentState!.validate()) {
      formkey.currentState!.save();

      final repository = ref.read(scheduleRepositoryProvider);

      var data = {
        'date': widget.selectedDate.toIso8601String(),
        'content': content,
        'completion': completion,
        'subject': subject,
      };

      try {
        if (widget.scheduleId == null) {
          await repository.createSchedule(data);
        } else {
          await repository.updateSchedule(widget.scheduleId!, data);
        }
        ref.read(scheduleProvider.notifier).fetchSchedules();

        Navigator.of(context).pop();
      } catch (e) {
        // 여기에 에러 처리 로직 추가
      }
    } else {
      // 여기에 유효성 검사 실패 시 처리 로직 추가
    }
  }
}

class _Time extends StatelessWidget {
  final Function(TimeOfDay) onStartTimeChanged;
  final Function(TimeOfDay) onEndTimeChanged;
  final int? startInitialValue;
  final int? endInitialValue;

  const _Time({
    required this.onStartTimeChanged,
    required this.onEndTimeChanged,
    this.startInitialValue,
    this.endInitialValue,
    Key? key,
  }) : super(key: key);

  TimeOfDay _convertMinutesToTimeOfDay(int? minutes) {
    if (minutes == null) return TimeOfDay.now();
    final int hour = minutes ~/ 60;
    final int minute = minutes % 60;
    return TimeOfDay(hour: hour, minute: minute);
  }

  Future<void> _selectTime(BuildContext context, bool isStartTime) async {
    TimeOfDay initialTime = (startInitialValue == null && isStartTime)
        ? const TimeOfDay(hour: 12, minute: 0)
        : _convertMinutesToTimeOfDay(
            isStartTime ? startInitialValue : endInitialValue);

    int selectedHour = initialTime.hour;
    int selectedMinute = initialTime.minute;

    await showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return SizedBox(
              height: MediaQuery.of(context).copyWith().size.height / 3,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      NumberPicker(
                        value: selectedHour,
                        minValue: 0,
                        maxValue: 23,
                        textMapper: (value) => "$value시",
                        onChanged: (newValue) =>
                            setState(() => selectedHour = newValue),
                      ),
                      NumberPicker(
                        value: selectedMinute,
                        minValue: 0,
                        maxValue: 59,
                        textMapper: (value) => "$value분",
                        onChanged: (newValue) =>
                            setState(() => selectedMinute = newValue),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    child: const Text('확인'),
                    onPressed: () {
                      TimeOfDay pickedTime =
                          TimeOfDay(hour: selectedHour, minute: selectedMinute);

                      // 시작 시간이 종료 시간보다 늦게 설정될 경우
                      if (isStartTime && endInitialValue != null) {
                        int endInMinutes = endInitialValue!;
                        int startInMinutes =
                            pickedTime.hour * 60 + pickedTime.minute;

                        if (startInMinutes >= endInMinutes) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('시작 시간은 종료 시간보다 늦게 설정할 수 없습니다!'),
                              duration: Duration(seconds: 2),
                            ),
                          );
                          // 종료 시간의 1분 전으로 시작 시간을 조정
                          pickedTime = TimeOfDay(
                              hour: endInMinutes ~/ 60,
                              minute: (endInMinutes % 60) - 1);
                        }
                      }

                      // 종료 시간이 시작 시간보다 빠를 경우
                      if (!isStartTime && startInitialValue != null) {
                        int startInMinutes = startInitialValue!;
                        int endInMinutes =
                            pickedTime.hour * 60 + pickedTime.minute;

                        if (endInMinutes <= startInMinutes) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('종료 시간은 시작 시간보다 빠르게 설정할 수 없습니다!'),
                              duration: Duration(seconds: 2),
                            ),
                          );
                          // 시작 시간의 1분 후로 종료 시간을 조정
                          pickedTime = TimeOfDay(
                              hour: startInMinutes ~/ 60,
                              minute: (startInMinutes % 60) + 1);
                        }
                      }

                      // 변경된 pickedTime으로 콜백 함수 호출
                      if (isStartTime) {
                        onStartTimeChanged(pickedTime);
                      } else {
                        onEndTimeChanged(pickedTime);
                      }
                      Navigator.pop(context);
                    },
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  String _formatTime(int? timeInMinutes, bool isStartTime) {
    if (timeInMinutes == null) return isStartTime ? "시작 시간" : "종료 시간";
    final int hour = timeInMinutes ~/ 60;
    final int minute = timeInMinutes % 60;
    return "${hour.toString().padLeft(2, '0')}시 ${minute.toString().padLeft(2, '0')}분";
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Expanded(
          child: TextButton(
            onPressed: () => _selectTime(context, true),
            child: Text(
              _formatTime(startInitialValue, true),
              style: const TextStyle(color: PRIMARY_COLOR),
            ),
          ),
        ),
        const SizedBox(width: 16.0),
        Expanded(
          child: TextButton(
            onPressed: () => _selectTime(context, false),
            child: Text(
              _formatTime(endInitialValue, false),
              style: const TextStyle(color: PRIMARY_COLOR),
            ),
          ),
        ),
      ],
    );
  }
}

class _Content extends StatelessWidget {
  final FormFieldSetter<String> onSaved;
  final String initialValue;

  const _Content({
    required this.onSaved,
    required this.initialValue,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: CustomTextField(
        label: "내용",
        isTime: false,
        onSaved: onSaved,
        initialValue: initialValue,
      ),
    );
  }
}

class _Subject extends StatelessWidget {
  final FormFieldSetter<String> onSaved;
  final String initialValue;

  const _Subject({
    required this.onSaved,
    required this.initialValue,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 200,
      height: 72,
      child: CustomTextField(
        label: "과목",
        isTime: false,
        onSaved: onSaved,
        initialValue: initialValue,
      ),
    );
  }
}

typedef ColorIdSetter = Function(int id);

class _SaveButton extends StatelessWidget {
  final VoidCallback onPressed;

  const _SaveButton({
    required this.onPressed,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: ElevatedButton(
            onPressed: onPressed,
            style: ElevatedButton.styleFrom(backgroundColor: PRIMARY_COLOR),
            child: const Align(
                alignment: Alignment.center,
                child: Text(
                  "저장",
                  style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 16.0,
                      color: Colors.white),
                )),
          ),
        ),
      ],
    );
  }
}

class _CompletionSlider extends StatefulWidget {
  final double completion;
  final Function(double) onCompletionChanged;

  const _CompletionSlider({
    required this.completion,
    required this.onCompletionChanged,
    Key? key,
  }) : super(key: key);

  @override
  _CompletionSliderState createState() => _CompletionSliderState();
}

class _CompletionSliderState extends State<_CompletionSlider> {
  late TextEditingController textEditingController;

  @override
  void initState() {
    super.initState();
    textEditingController =
        TextEditingController(text: _formatCompletion(widget.completion));
  }

  @override
  void dispose() {
    textEditingController.dispose();
    super.dispose();
  }

  void _handleSliderChange(double value) {
    widget.onCompletionChanged(value);
    textEditingController.text = value.round().toString();
  }

  void _handleTextChange(String value) {
    double? newValue = double.tryParse(value);
    if (newValue != null && newValue >= 0 && newValue <= 100) {
      widget.onCompletionChanged(newValue);
      textEditingController.text = _formatCompletion(newValue);
    }
  }

  String _formatCompletion(double value) {
    return value % 1 == 0 ? value.toInt().toString() : value.toStringAsFixed(1);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.0),
            child: Text(
              '완성도',
              style: TextStyle(
                color: PRIMARY_COLOR,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          SizedBox(
            height: 40,
            child: Row(
              children: [
                Expanded(
                  child: Slider(
                    value: widget.completion,
                    min: 0,
                    max: 100,
                    divisions: 100,
                    label: _formatCompletion(widget.completion),
                    onChanged: _handleSliderChange,
                  ),
                ),
                const SizedBox(width: 4),
                SizedBox(
                  width: 50,
                  child: TextField(
                    controller: textEditingController,
                    onChanged: _handleTextChange,
                    onSubmitted: _handleTextChange,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      hintText: '0-100',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(vertical: 10),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
