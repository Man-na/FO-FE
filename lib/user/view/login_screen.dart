import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/component/custom_text_form_field.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:bluewhale_link/signup/view/signup_screen.dart';
import 'package:bluewhale_link/user/component/login_button.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  String email = "";
  String password = "";

  void updateEmail(String newEmail) {
    setState(() {
      email = newEmail;
    });
  }

  void updatePassword(String newPassword) {
    setState(() {
      password = newPassword;
    });
  }

  @override
  Widget build(BuildContext context) {
    bool isTablet = MediaQuery.of(context).size.width > 600;

    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Colors.white,
            PRIMARY_COLOR,
          ],
        ),
      ),
      child: DefaultLayout(
        backgroundColor: Colors.transparent,
        child: SingleChildScrollView(
          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
          child: SafeArea(
            top: true,
            bottom: true,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(height: MediaQuery.of(context).size.height * 0.15),
                    Image.asset(
                      'asset/img/link/bluewhalelink.png',
                      width: 200.0,
                    ),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.05),
                    Container(
                      width: MediaQuery.of(context).size.width * 0.8,
                      child: CustomTextFormField(
                        hintText: '이메일을 입력해주세요.',
                        onChanged: updateEmail,
                      ),
                    ),
                    const SizedBox(height: 16.0),
                    Container(
                      width: MediaQuery.of(context).size.width * 0.8,
                      child: CustomTextFormField(
                        hintText: '비밀번호를 입력해주세요.',
                        onChanged: updatePassword,
                        obscureText: true,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => SignupScreen(),
                              ),
                            );
                          },
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.black,
                          ),
                          child: Text(
                            '회원가입',
                            style: TextStyle(fontSize: isTablet ? 16.0 : 12.0),
                          ),
                        ),
                        TextButton(
                          onPressed: () async {
                            // Navigator for ID 찾기
                          },
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.black,
                          ),
                          child: Text(
                            'ID 찾기',
                            style: TextStyle(fontSize: isTablet ? 16.0 : 12.0),
                          ),
                        ),
                        TextButton(
                          onPressed: () async {
                            // Navigator for 비밀번호 찾기
                          },
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.black,
                          ),
                          child: Text(
                            '비밀번호 찾기',
                            style: TextStyle(fontSize: isTablet ? 16.0 : 12.0),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    LoginButton(
                      email: email,
                      password: password,
                      ref: ref,
                      context: context,
                    ),
                    SizedBox(
                      height: isTablet
                          ? MediaQuery.of(context).size.height * 0.12
                          : MediaQuery.of(context).size.height * 0.06,
                    ),
                    _SubTitle(),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.1),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _SubTitle extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      MediaQuery.of(context).size.width > 500
          ? 'You are nothing. So, can be everything'
          : 'You are nothing. \nSo, can be everything',
      style: TextStyle(
        fontSize: MediaQuery.of(context).size.width > 500 ? 32 : 16,
        color: Colors.white,
      ),
    );
  }
}
