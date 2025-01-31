import 'package:flutter/material.dart';
import 'package:bluewhale_link/OPUS/view/opus_screen.dart';
import 'package:bluewhale_link/common/const/colors.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:bluewhale_link/consulting/view/consulting_screen.dart';
import 'package:bluewhale_link/link/view/link_screen.dart';
import 'package:bluewhale_link/schedule/view/schedule_screen.dart';
import 'package:bluewhale_link/setting/view/setting_screen.dart';

class RootTab extends StatefulWidget {
  const RootTab({Key? key}) : super(key: key);

  @override
  State<RootTab> createState() => _RootTabState();
}

class _RootTabState extends State<RootTab> with SingleTickerProviderStateMixin {
  late TabController controller;

  int index = 0;

  @override
  void initState() {
    super.initState();

    controller = TabController(length: 5, vsync: this);
    controller.addListener(tabListner);
  }

  @override
  void dispose() {
    controller.removeListener(tabListner);
    super.dispose();
  }

  void tabListner() {
    setState(() {
      index = controller.index;
    });
  }

  @override
  Widget build(BuildContext context) {
    String title;

    switch (index) {
      case 0:
        title = '청경 LINK           계획';
        break;
      case 1:
        title = '청경 LINK           OPUS';
        break;
      default:
        title = '청경 LINK';
    }

    return DefaultLayout(
      title: title,
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: PRIMARY_COLOR,
        unselectedItemColor: BODY_TEXT_COLOR,
        selectedFontSize: 10,
        unselectedFontSize: 10,
        type: BottomNavigationBarType.fixed,
        onTap: (int index) {
          controller.animateTo(index);
        },
        currentIndex: index,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_month),
            label: "계획",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.movie_outlined),
            label: "OPUS",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            label: "홈",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.mail_outlined),
            label: "컨설팅",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_location_alt_outlined),
            label: "링크",
          ),
        ],
      ),
      child: TabBarView(
        physics: const NeverScrollableScrollPhysics(),
        controller: controller,
        children: const [
          ScheduleScreen(),
          OpusScreen(),
          SettingScreen(),
          ConsultingScreen(),
          LinkScreen(),
          // InterviewScreen(),
        ],
      ),
    );
  }
}
