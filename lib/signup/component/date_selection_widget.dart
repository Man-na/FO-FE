import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DateSelectionWidget extends StatefulWidget {
  final String label;
  final DateTime initialDate;
  final Function(DateTime) onDateSelected;
  final TextEditingController dateController;

  const DateSelectionWidget({
    Key? key,
    required this.label,
    required this.initialDate,
    required this.onDateSelected,
    required this.dateController,
  }) : super(key: key);

  @override
  _DateSelectionWidgetState createState() => _DateSelectionWidgetState();
}

class _DateSelectionWidgetState extends State<DateSelectionWidget> {
  late DateTime selectedDate;

  @override
  void initState() {
    super.initState();
    selectedDate = widget.initialDate;
    widget.dateController.text = DateFormat('yyyy-MM-dd').format(selectedDate);
  }

  void _showCupertinoDatePicker(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder: (_) => Container(
        height: 300,
        color: Colors.white,
        child: CupertinoDatePicker(
          mode: CupertinoDatePickerMode.date,
          initialDateTime: selectedDate,
          minimumYear: 1900,
          maximumYear: DateTime.now().year,
          onDateTimeChanged: (DateTime newDate) {
            setState(() {
              selectedDate = newDate;
            });
            widget.onDateSelected(newDate);
            widget.dateController.text = DateFormat('yyyy-MM-dd').format(newDate);
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    bool isTablet = MediaQuery.of(context).size.width > 500;

    return Center(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFF004D80),
              border: Border.all(
                color: const Color(0xFF47739F),
                width: 1.0,
              ),
            ),
            width: isTablet ? 160.0 : 100.0,
            height: 32.0,
            child: Center(
              child: Text(
                widget.label,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: isTablet ? 16.0 : 12.0,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8.0),
          InkWell(
            onTap: () => _showCupertinoDatePicker(context),
            child: Container(
              width: MediaQuery.of(context).size.width * 0.55,
              height: 36.0,
              alignment: Alignment.centerLeft,
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.grey)),
              ),
              child: Text(
                DateFormat('yyyy-MM-dd').format(selectedDate),
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
