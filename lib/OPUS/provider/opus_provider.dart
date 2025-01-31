import 'package:bluewhale_link/OPUS/model/opus_model.dart';
import 'package:bluewhale_link/OPUS/repository/opus_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final opusProvider = StateNotifierProvider<OpusStateNotifier, List<OpusModel>>((ref) {
  final repository = ref.watch(opusRepositoryProvider);

  final notifier = OpusStateNotifier(repository: repository);

  return notifier;
});

class OpusStateNotifier extends StateNotifier<List<OpusModel>> {
  final OpusRepository repository;

  OpusStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchAllOpus();
  }

  fetchAllOpus() async {
    final res = await repository.fetchAllOpus();

    state = res;
  }
}
