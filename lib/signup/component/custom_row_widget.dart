import 'package:flutter/material.dart';

class CustomRowWidget extends StatefulWidget {
  final String label;
  final TextEditingController controller;
  final bool isPassword;
  final Widget? extraWidget;
  final bool isDisabled;

  const CustomRowWidget({
    Key? key,
    required this.label,
    required this.controller,
    this.isPassword = false,
    this.isDisabled = false,
    this.extraWidget,
  }) : super(key: key);

  @override
  _CustomRowWidgetState createState() => _CustomRowWidgetState();
}

class _CustomRowWidgetState extends State<CustomRowWidget> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    bool isTablet = MediaQuery.of(context).size.width > 500;

    return Center(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            decoration: BoxDecoration(
              color: Color(0xFF004D80),
              border: Border.all(
                color: Color(0xFF47739F),
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
          SizedBox(width: 8.0),
          Container(
            width: widget.extraWidget != null
                ? isTablet? MediaQuery.of(context).size.width * 0.46 : MediaQuery.of(context).size.width * 0.31
                : MediaQuery.of(context).size.width * 0.55,
            child: TextField(
              controller: widget.controller,
              enabled: !widget.isDisabled,
              obscureText: widget.isPassword ? _obscureText : false,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                border: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                disabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                contentPadding:
                    EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                suffixIcon: widget.isPassword
                    ? IconButton(
                        icon: Icon(
                          _obscureText
                              ? Icons.visibility
                              : Icons.visibility_off,
                          color: Colors.white,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscureText = !_obscureText;
                          });
                        },
                      )
                    : null,
              ),
            ),
          ),
          if (widget.extraWidget != null) widget.extraWidget!,
        ],
      ),
    );
  }
}
