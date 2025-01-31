import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:bluewhale_link/common/secure_storage/secure_storage.dart';
import 'package:bluewhale_link/common/view/root_tab.dart';
import 'package:bluewhale_link/user/view/login_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  ConsumerState createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    checkToken();
  }

  void checkToken() async {
    final storage = ref.read(secureStorageProvider);
    final refreshToken = await storage.read(key: REFRESH_TOKEN_KEY);
    final accessToken = await storage.read(key: ACCESS_TOKEN_KEY);
    final dio = ref.read(dioProvider);

    try {
      final res = await dio.post(
        '$server/auth/token',
        options: Options(
          headers: {'authorization': 'Bearer $refreshToken'},
        ),
      );

      await storage.write(
        key: ACCESS_TOKEN_KEY,
        value: res.data['accessToken'],
      );

      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const RootTab()),
        (route) => false,
      );
    } catch (e) {
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const LoginScreen()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultLayout(
      backgroundColor: Colors.white,
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'asset/img/link/bluewhalelink.png',
              width: 200,
              height: 200,
            ),
            const SizedBox(
              height: 16.0,
            ),
            const CircularProgressIndicator(
              color: Colors.white,
            )
          ],
        ),
      ),
    );
  }
}
