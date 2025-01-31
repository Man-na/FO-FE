import 'package:bluewhale_link/consulting/model/consulting_message_model.dart';
import 'package:bluewhale_link/consulting/repository/consulting_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ConsultingMessageStateNotifier
    extends StateNotifier<List<ConsultingMessageModel>> {
  final ConsultingRepository repository;

  ConsultingMessageStateNotifier(
      {required this.repository})
      : super([]) {
    fetchConsultingMessages();
  }

  fetchConsultingMessages() async {
    try {
      final res = await repository.fetchConsultingMessages();
      state = res;
    } catch (e) {
      print(e);
    }
  }
}

final consultingMessageProvider = StateNotifierProvider.autoDispose<
    ConsultingMessageStateNotifier, List<ConsultingMessageModel>>((ref) {
  final repository = ref.watch(consultingRepositoryProvider);

  return ConsultingMessageStateNotifier(
      repository: repository);
});
