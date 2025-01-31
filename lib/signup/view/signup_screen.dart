import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/signup/component/custom_row_widget.dart';
import 'package:bluewhale_link/signup/component/date_selection_widget.dart';
import 'package:bluewhale_link/signup/component/header_widget.dart';
import 'package:bluewhale_link/signup/model/check_email_model.dart';
import 'package:bluewhale_link/signup/model/signup_model.dart';
import 'package:bluewhale_link/signup/reopsitory/signup_repository.dart';
import 'package:bluewhale_link/user/view/login_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

enum UserType { Parent, Student }

class SignupScreen extends ConsumerStatefulWidget {
  const SignupScreen({super.key});

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends ConsumerState<SignupScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();
  final TextEditingController schoolController = TextEditingController();
  final TextEditingController studentNameController = TextEditingController();
  final TextEditingController gradeController = TextEditingController();

  bool _isEmailChecked = false;
  bool _isEmailAvailable = false;
  UserType userType = UserType.Student;

  @override
  Widget build(BuildContext context) {
    DateTime initialDate = DateTime.now();
    bool isTablet = MediaQuery.of(context).size.width > 500;

    Widget _buildUserTypeSelection() {
      return Column(
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              SafeArea(
                child: Container(
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
                      "회원 유형",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: isTablet ? 16.0 : 12.0,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8.0),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4.0),
                child: Container(
                  decoration: const BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.white,
                        width: 1.0,
                      ),
                    ),
                  ),
                  width: MediaQuery.of(context).size.width * 0.55,
                  child: Row(
                    children: [
                      Expanded(
                        child: RadioListTile<UserType>(
                          title: Text(
                            '학부모',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                              fontSize: isTablet ? 16.0 : 12.0,
                            ),
                          ),
                          value: UserType.Parent,
                          groupValue: userType,
                          onChanged: (UserType? value) {
                            setState(() => userType = value!);
                          },
                          activeColor: Colors.white,
                          contentPadding:
                              const EdgeInsets.symmetric(horizontal: 2.0),
                        ),
                      ),
                      Expanded(
                        child: RadioListTile<UserType>(
                          title: Text(
                            '학생',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                              fontSize: isTablet ? 16.0 : 12.0,
                            ),
                          ),
                          value: UserType.Student,
                          groupValue: userType,
                          onChanged: (UserType? value) {
                            setState(() => userType = value!);
                          },
                          activeColor: Colors.white,
                          contentPadding:
                              const EdgeInsets.symmetric(horizontal: 2.0),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          if (userType == UserType.Parent)
            CustomRowWidget(
              label: '학생 이름',
              controller: studentNameController,
            ),
          if (userType == UserType.Student)
            CustomRowWidget(
              label: '학년',
              controller: gradeController,
            ),
        ],
      );
    }

    void handleDateChange(DateTime date) {
      dobController.text = DateFormat('yyyy-MM-dd').format(date);
    }

    void _showAlert(BuildContext context, String message) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('안내'),
            content: Text(message),
            actions: <Widget>[
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }

    void signup() async {
      if (nameController.text.isEmpty ||
          phoneController.text.isEmpty ||
          dobController.text.isEmpty ||
          emailController.text.isEmpty ||
          passwordController.text.isEmpty ||
          confirmPasswordController.text.isEmpty ||
          (userType == UserType.Student && schoolController.text.isEmpty) ||
          (userType == UserType.Parent && studentNameController.text.isEmpty) ||
          (userType == UserType.Student && gradeController.text.isEmpty)) {
        _showAlert(context, '모든 정보를 입력해주세요.');
        return;
      }

      if (passwordController.text != confirmPasswordController.text) {
        _showAlert(context, '비밀번호가 일치하지 않습니다. \n다시 한 번 확인해주세요.');
        return;
      }

      if (!_isEmailChecked) {
        _showAlert(context, '이메일 중복확인을 해주세요.');
        return;
      }

      final repository = ref.read(signupRepositoryProvider);

      DateTime? birthDate;
      try {
        birthDate = DateFormat('yyyy-MM-dd').parse(dobController.text);
      } catch (e) {
        print("Invalid date format: ${dobController.text}");
        return;
      }

      String role = userType == UserType.Parent ? "parent" : "student";
      String studentName =
          userType == UserType.Parent ? studentNameController.text : "";
      int grade = userType == UserType.Student
          ? int.tryParse(gradeController.text) ?? 0
          : 0;
      String school = userType == UserType.Student ? schoolController.text : "";

      final signupData = SignupModel(
        userName: nameController.text,
        phoneNumber: phoneController.text,
        birth: birthDate,
        email: emailController.text,
        password: passwordController.text,
        school: school,
        role: role,
        studentName: studentName,
        grade: grade,
      );

      try {
        await repository.signupStudent(signupData.toJson());
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => const LoginScreen()),
        );
      } catch (e) {
        print(e);
      }
    }

    void _checkEmailDuplication() async {
      final repository = ref.read(signupRepositoryProvider);

      try {
        final CheckEmailModel response = await repository
            .checkEmailDuplication({'email': emailController.text});
        _isEmailAvailable = response.isEmailAvailable;

        setState(() {
          _isEmailChecked = _isEmailAvailable;
        });

        if (_isEmailAvailable) {
          _showAlert(context, '사용 가능한 이메일 입니다.');
        } else {
          _showAlert(context, '이미 사용중인 이메일입니다.');
        }
      } on DioError catch (e) {
        if (e.response?.statusCode == 400) {
          _showAlert(context, '잘못된 이메일 형식입니다.');
        } else {
          print('Error checking email duplication: $e');
        }
      } catch (e) {
        print('Error checking email duplication: $e');
      }
    }

    Widget _buildEmailInput() {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: CustomRowWidget(
          label: '이메일',
          controller: emailController,
          isDisabled: _isEmailChecked,
          extraWidget: ElevatedButton(
            onPressed: _isEmailChecked ? null : _checkEmailDuplication,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF004D80),
              foregroundColor: Colors.white,
            ),
            child: const Center(
              child: Text(
                '중복 확인',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12.0),
              ),
            ),
          ),
        ),
      );
    }

    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Container(
            color: PRIMARY_COLOR,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 64.0),
                HeaderWidget(isTablet: isTablet),
                SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: <Widget>[
                        _buildUserTypeSelection(),
                        const SizedBox(height: 8.0),
                        if (userType == UserType.Student)
                          CustomRowWidget(
                            label: '학교',
                            controller: schoolController,
                          ),
                        const SizedBox(height: 8.0),
                        CustomRowWidget(
                          label: '이름',
                          controller: nameController,
                        ),
                        const SizedBox(height: 8.0),
                        CustomRowWidget(
                          label: '휴대전화',
                          controller: phoneController,
                        ),
                        const SizedBox(height: 8.0),
                        DateSelectionWidget(
                          label: '생년월일',
                          initialDate: initialDate,
                          onDateSelected: handleDateChange,
                          dateController: dobController,
                        ),
                        const SizedBox(height: 8.0),
                        _buildEmailInput(),
                        const SizedBox(height: 8.0),
                        CustomRowWidget(
                          label: '비밀번호',
                          controller: passwordController,
                          isPassword: true,
                        ),
                        const SizedBox(height: 8.0),
                        CustomRowWidget(
                          label: '비밀번호 재확인',
                          controller: confirmPasswordController,
                          isPassword: true,
                        ),
                        const SizedBox(height: 32.0),
                        SizedBox(
                          width: MediaQuery.of(context).size.width * 0.8,
                          child: ElevatedButton(
                            onPressed: signup,
                            child: const Text(
                              '회원가입',
                              style: TextStyle(
                                color: PRIMARY_COLOR,
                                fontWeight: FontWeight.w600,
                                fontSize: 16.0,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16.0),
                        SizedBox(
                          width: MediaQuery.of(context).size.width * 0.4,
                          child: ElevatedButton(
                            onPressed: () => {
                              Navigator.of(context).pushReplacement(
                                MaterialPageRoute(
                                    builder: (context) => const LoginScreen()),
                              )
                            },
                            child: const Text(
                              '로그인 페이지',
                              style: TextStyle(
                                color: PRIMARY_COLOR,
                                fontWeight: FontWeight.w600,
                                fontSize: 14.0,
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: isTablet ? 400.0 : 64),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
