import 'dart:convert';

import 'package:bluewhale_link/OPUS/provider/opus_provider.dart';
import 'package:bluewhale_link/common/secure_storage/secure_storage.dart';
import 'package:bluewhale_link/consulting/provider/consulting_message_provider.dart';
import 'package:bluewhale_link/schedule/provider/color_provider.dart';
import 'package:bluewhale_link/schedule/provider/schedule_provider.dart';
import 'package:bluewhale_link/user/provider/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/view/root_tab.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LoginButton extends StatelessWidget {
  final String email;
  final String password;
  final WidgetRef ref;
  final BuildContext context;

  const LoginButton({
    Key? key,
    required this.email,
    required this.password,
    required this.ref,
    required this.context,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final dio = Dio();

    return SizedBox(
      width: MediaQuery.of(context).size.width * 0.4,
      child: ElevatedButton(
        onPressed: () async {
          try {
            final rawString = '$email:$password';
            Codec<String, String> stringToBase64 = utf8.fuse(base64);
            String token = stringToBase64.encode(rawString);
            final res = await dio.post(
              '$server/auth/login',
              options: Options(
                headers: {'authorization': 'Basic $token'},
              ),
            );

            final responseData = res.data as Map<String, dynamic>;
            if (!responseData['user']['isAccepted']) {
              const snackBar = SnackBar(
                content: Center(
                  child: Text(
                    '관리자의 승인이 필요합니다.\n잠시만 기다려주세요!',
                    style: TextStyle(fontSize: 16.0),
                  ),
                ),
                backgroundColor: Colors.orange,
              );
              ScaffoldMessenger.of(context).showSnackBar(snackBar);
              return;
            }

            final storage = ref.read(secureStorageProvider);
            final refreshToken = res.data['refreshToken'];
            final accessToken = res.data['accessToken'];
            await storage.write(key: REFRESH_TOKEN_KEY, value: refreshToken);
            await storage.write(key: ACCESS_TOKEN_KEY, value: accessToken);
            ref.read(userProvider.notifier).fetchUserInfo();
            ref.read(scheduleProvider.notifier).fetchSchedules();
            ref.read(opusProvider.notifier).fetchAllOpus();
            ref.read(colorProvider.notifier).fetchColors();
            ref
                .read(consultingMessageProvider.notifier)
                .fetchConsultingMessages();

            Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(builder: (context) => const RootTab()),
              (Route<dynamic> route) => false,
            );
          } catch (e) {
            print(e);
            const snackBar = SnackBar(
              content: Text('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'),
              backgroundColor: Colors.red,
            );
            ScaffoldMessenger.of(context).showSnackBar(snackBar);
          }
        },
        style: ElevatedButton.styleFrom(backgroundColor: PRIMARY_COLOR),
        child: Text(
          '로그인',
          style: TextStyle(
            color: Colors.white,
            fontSize: MediaQuery.of(context).size.width > 500 ? 16 : 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
