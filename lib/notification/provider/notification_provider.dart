import 'package:bluewhale_link/notification/model/notification_model.dart';
import 'package:bluewhale_link/notification/repository/notification_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final notificationProvider = StateNotifierProvider<NotificationStateNotifier, List<NotificationModel>>((ref) {
  final repository = ref.watch(notificationRepositoryProvider);

  final notifier = NotificationStateNotifier(repository: repository);

  return notifier;
});

class NotificationStateNotifier extends StateNotifier<List<NotificationModel>> {
  final NotificationRepository repository;

  NotificationStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchNotifications();
  }

  fetchNotifications() async {
    final res = await repository.fetchNotifications();

    state = res;
  }

  Future<void> markAsRead(int notificationId) async {
    try {
      await repository.updateIsRead(notificationId);
      fetchNotifications();
    } catch (e) {
      print(e);
    }
  }
}
