import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bluewhale_link/consulting/component/consultation_dialog.dart';
import 'package:bluewhale_link/consulting/model/consulting_message_model.dart';
import 'package:bluewhale_link/consulting/provider/consulting_message_provider.dart';
import 'package:bluewhale_link/common/layout/default_layout.dart';
import 'package:intl/intl.dart';

class ConsultingScreen extends ConsumerStatefulWidget {
  const ConsultingScreen({super.key});

  @override
  _ConsultingScreenState createState() => _ConsultingScreenState();
}

class _ConsultingScreenState extends ConsumerState<ConsultingScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.shortestSide > 500;

    return isTablet ? _buildLayout(context) : _buildMobileLayout(context);
  }

  Widget _buildLayout(BuildContext context) {
    final consultingMessages = ref.watch(consultingMessageProvider);

    return DefaultLayout(
      child: Column(
        children: [
          TabBar(
            controller: _tabController,
            isScrollable: true,
            tabs: const [
              Tab(text: '청경 Consulting'),
              Tab(text: '내신'),
              Tab(text: '모의고사'),
            ],
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                consultingMessages.isNotEmpty
                    ? _buildConsultingList(consultingMessages)
                    : _buildCenteredMessage('컨설팅 메시지가 없습니다.'),
                _buildCenteredMessage('준비 중인 기능입니다.'),
                _buildCenteredMessage('준비 중인 기능입니다.'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCenteredMessage(String message) {
    return Center(
      child: Text(
        message,
        style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w500),
      ),
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return OrientationBuilder(
      builder: (context, orientation) {
        return _buildLayout(context);
      },
    );
  }

  Widget _buildConsultingList(List<ConsultingMessageModel> consultingMessages) {
    return ListView.builder(
      itemCount: consultingMessages.length,
      itemBuilder: (BuildContext context, int index) {
        final ConsultingMessageModel message = consultingMessages[index];
        return _buildConsultingItem(context, message);
      },
    );
  }

  Widget _buildConsultingItem(
      BuildContext context, ConsultingMessageModel message) {
    final formattedStartDate =
        DateFormat('yyyy.MM.dd').format(message.startDate);
    final formattedEndDate = DateFormat('MM.dd').format(message.endDate);
    final formattedCreatedAt =
        DateFormat('yyyy.MM.dd').format(message.createdAt);
    bool isTablet = MediaQuery.of(context).size.width > 500;

    return Container(
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Colors.grey, width: 1.0)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: InkWell(
          onTap: () => _showConsultationDialog(context, message.consultingId),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  '$formattedStartDate ~ $formattedEndDate',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: isTablet ? 20.0 : 12.0,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(
                width: isTablet ? 60 : 40,
                child: Text(
                  message.isRead ? '' : 'New!',
                  style: TextStyle(
                    color: Colors.red,
                    fontWeight: FontWeight.w600,
                    fontSize: isTablet ? 20.0 : 12.0,
                  ),
                ),
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      formattedCreatedAt,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: isTablet ? 20.0 : 12.0,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      '${message.consultant}T',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: isTablet ? 20.0 : 12.0,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                width: 40,
                child: Image.asset('asset/img/link/consulting.png'),
              )
            ],
          ),
        ),
      ),
    );
  }

  void _showConsultationDialog(BuildContext context, int consultingId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return ConsultationDialog(consultingId: consultingId);
      },
    );
  }
}
