import 'package:flutter/material.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/user/provider/user_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class DefaultLayout extends ConsumerWidget {
  final Color? backgroundColor;
  final Widget child;
  final String? title;
  final Widget? bottomNavigationBar;

  const DefaultLayout({
    required this.child,
    this.backgroundColor,
    this.title,
    this.bottomNavigationBar,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userData = ref.watch(userProvider);

    return Scaffold(
      backgroundColor: backgroundColor ?? Colors.white,
      appBar: renderAppBar(userData.userName, userData.profileUrl),
      body: child,
      bottomNavigationBar: bottomNavigationBar,
    );
  }

  AppBar? renderAppBar(String? userName, String? profileUrl) {
    if (title == null) {
      return null;
    } else {
      return AppBar(
        centerTitle: false,
        backgroundColor: PRIMARY_COLOR,
        elevation: 0,
        title: Text(
          title!,
          style: const TextStyle(
              fontSize: 18.0, fontWeight: FontWeight.w500, color: Colors.white),
        ),
        actions: [
          if (userName != null)
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundImage: (profileUrl != null && profileUrl.isNotEmpty)
                        ? NetworkImage(profileUrl) as ImageProvider<Object>
                        : const AssetImage('asset/img/misc/user_placeholder.png') as ImageProvider<Object>,
                    radius: 16.0,
                  ),
                  const SizedBox(width: 8.0),
                  Text(
                    userName,
                    style: const TextStyle(
                        fontSize: 16.0,
                        fontWeight: FontWeight.w500,
                        color: Colors.white),
                  ),
                ],
              ),
            ),
        ],
        foregroundColor: Colors.black,
        iconTheme: const IconThemeData(
          color: Colors.white,
        ),
      );
    }
  }
}
