import 'dart:io';

import 'package:flutter/material.dart';
import 'package:bluewhale_link/attendance/view/attendance_screen.dart';
import 'package:bluewhale_link/attendance/view/dial_screen.dart';
import 'package:bluewhale_link/cctv/view/cctv_screen.dart';
import 'package:bluewhale_link/common/secure_storage/secure_storage.dart';
import 'package:bluewhale_link/notification/view/notification_screen.dart';
import 'package:bluewhale_link/qr/view/qr_screen.dart';
import 'package:bluewhale_link/user/provider/user_provider.dart';
import 'package:bluewhale_link/user/repository/user_repository.dart';
import 'package:bluewhale_link/user/view/login_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';

class SettingScreen extends ConsumerStatefulWidget {
  const SettingScreen({super.key});

  @override
  ConsumerState<SettingScreen> createState() => _SettingScreenState();
}

class _SettingScreenState extends ConsumerState<SettingScreen> {
  bool isEditing = false;
  late TextEditingController personalMessageController;
  String? imageUrl;

  @override
  void initState() {
    super.initState();
    final userData = ref.read(userProvider);
    personalMessageController =
        TextEditingController(text: userData.motto ?? '');
  }

  @override
  void dispose() {
    personalMessageController.dispose();
    super.dispose();
  }

  Future<void> _showImagePicker(BuildContext context) async {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext bc) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.only(top: 12.0),
            child: Wrap(
              children: <Widget>[
                ListTile(
                  leading: const Icon(Icons.photo_library),
                  title: const Text('갤러리에서 선택'),
                  onTap: () {
                    Navigator.of(context).pop();
                    pickImage(ImageSource.gallery);
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.photo_camera),
                  title: const Text('카메라로 촬영'),
                  onTap: () {
                    Navigator.of(context).pop();
                    pickImage(ImageSource.camera);
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Future pickImage(ImageSource source) async {
    final pickedFile = await ImagePicker().pickImage(source: source);

    if (pickedFile != null) {
      File imageFile = File(pickedFile.path);
      uploadProfileImageToServer(imageFile);
    }
  }

  Future uploadProfileImageToServer(File imageFile) async {
    final repository = ref.read(userRepositoryProvider);
    try {
      await repository.updateUserProfileImage(imageFile);
      ref.read(userProvider.notifier).fetchUserInfo();
    } catch (e) {
      print('프로필 이미지 업데이트에 실패하였습니다.: $e');
    }
  }

  void _toggleEditMode() {
    if (!isEditing) {
      personalMessageController.text = ref.read(userProvider).motto ?? '';
    }
    setState(() {
      isEditing = !isEditing;
    });
  }

  void deleteToken() async {
    ref.read(userProvider.notifier).refreshUserInfo();
    final storage = ref.read(secureStorageProvider);
    await storage.deleteAll();
  }

  void _saveEdit() async {
    if (personalMessageController.text.isNotEmpty) {
      try {
        final repository = ref.read(userRepositoryProvider);
        await repository.updateUserInfo(
          {'motto': personalMessageController.text},
        );
        ref.read(userProvider.notifier).fetchUserInfo();
      } catch (e) {
        print('나의 목표 업데이트를 실패했습니다. $e');
      }
    }
    _toggleEditMode();
  }

  void _cancelEdit() {
    personalMessageController.clear();
    _toggleEditMode();
  }

  @override
  Widget build(BuildContext context) {
    final userData = ref.read(userProvider);

    return Padding(
      padding: const EdgeInsets.only(top: 16.0),
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            GestureDetector(
              onTap: () => _showImagePicker(context),
              child: CircleAvatar(
                backgroundImage: (userData.profileUrl != null &&
                        userData.profileUrl!.isNotEmpty)
                    ? NetworkImage(userData.profileUrl!)
                        as ImageProvider<Object>
                    : const AssetImage('asset/img/misc/user_placeholder.png')
                        as ImageProvider<Object>,
                radius: 60.0,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              userData.userName,
              style: const TextStyle(fontSize: 16.0, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 20),
            _buildPersonalMessageSection(),
            _buildNotificationButton(),
            if (userData.role == 'admin') _buildDialScreenButton(),
            _buildAttendanceButton(),
            if (userData.role == 'admin' || userData.role == 'parent')
              _buildCCTVButton(),
            _buildLogoutButton(),
            _buildWithdrawlButton(),
            // _buildQrScreen(),
          ],
        ),
      ),
    );
  }

  Widget _buildPersonalMessageSection() {
    final userData = ref.watch(userProvider);
    String userMotto = isEditing
        ? personalMessageController.text
        : (userData.motto ?? '나의 목표');
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        border: Border(
          top: BorderSide(color: Colors.black),
        ),
      ),
      child: Row(
        children: [
          const Padding(
            padding: EdgeInsets.only(left: 24, right: 8),
            child: Icon(Icons.person, color: Colors.black),
          ),
          Expanded(
            child: isEditing
                ? TextField(
                    controller: personalMessageController,
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      hintText: '나의 목표',
                    ),
                    keyboardType: TextInputType.multiline,
                    textInputAction: TextInputAction.done,
                  )
                : Text(
                    userMotto,
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 16.0,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
          ),
          isEditing
              ? IconButton(
                  icon: const Icon(Icons.check),
                  onPressed: _saveEdit,
                )
              : IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: _toggleEditMode,
                ),
        ],
      ),
    );
  }

  Widget _buildLogoutButton() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Colors.black),
        ),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () {
          deleteToken();
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (context) => const LoginScreen()),
            (Route<dynamic> route) => false,
          );
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.logout, color: Colors.black),
            SizedBox(width: 8.0),
            Text(
              '로그아웃',
              style: TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAttendanceButton() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Colors.black),
        ),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => const AttendanceScreen(),
            ),
          );
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.check, color: Colors.black),
            SizedBox(width: 8.0),
            Text(
              '출석현황',
              style: TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotificationButton() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border.symmetric(horizontal: BorderSide(color: Colors.black)),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => const NotificationScreen(),
            ),
          );
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.campaign_outlined, color: Colors.black),
            SizedBox(width: 8.0),
            Text(
              '공지사항',
              style: TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCCTVButton() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Colors.black),
        ),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => const CctvScreen(),
            ),
          );
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.camera_alt_outlined, color: Colors.black),
            SizedBox(width: 8.0),
            Text(
              'CCTV',
              style: TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDialScreenButton() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Colors.black),
        ),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => const DialScreen(),
            ),
          );
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.dialpad, color: Colors.black),
            SizedBox(width: 8.0),
            Text(
              '출석체크 페이지',
              style: TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWithdrawlButton() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Colors.black),
        ),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () async {
          final result = await showDialog<bool>(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('회원 탈퇴'),
              content: const Text('탈퇴하시겠습니까? \n탈퇴 시 회원의 모든 정보가 사라집니다.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.of(context).pop(false),
                  child: const Text('아니오'),
                ),
                TextButton(
                  onPressed: () => Navigator.of(context).pop(true),
                  child: const Text('예'),
                ),
              ],
            ),
          );

          // 사용자가 '예'를 선택한 경우
          if (result == true) {
            try {
              final userRepository = ref.read(userRepositoryProvider);
              await userRepository.deleteUserInfo();
              deleteToken();
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => const LoginScreen()),
                (Route<dynamic> route) => false,
              );
            } catch (e) {
              print(e);
            }
          }
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.do_not_disturb_alt_outlined, color: Colors.black),
            SizedBox(width: 8.0),
            Text(
              '회원탈퇴',
              style: TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQrScreen() {
    return Container(
      width: double.infinity,
      height: 48.0,
      decoration: const BoxDecoration(
        border: Border.symmetric(horizontal: BorderSide(color: Colors.black)),
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        onPressed: () {
          deleteToken();
          Navigator.of(context).push(
            MaterialPageRoute(builder: (context) => QRScanScreen()),
          );
        },
        child: const Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Icon(Icons.logout, color: Colors.black),
            SizedBox(width: 8.0),
            Padding(
              padding: EdgeInsets.only(bottom: 4.0),
              child: Text(
                'QR',
                style: TextStyle(
                  fontSize: 16.0,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
