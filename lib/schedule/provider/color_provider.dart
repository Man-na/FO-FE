import 'package:bluewhale_link/schedule/model/color_model.dart';
import 'package:bluewhale_link/schedule/repository/schedule_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final colorProvider = StateNotifierProvider<ColorStateNotifier, List<ColorModel>>((ref) {
  final repository = ref.watch(scheduleRepositoryProvider);

  final notifier = ColorStateNotifier(repository: repository);

  return notifier;
});

class ColorStateNotifier extends StateNotifier<List<ColorModel>> {
  final ScheduleRepository repository;

  ColorStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchColors();
  }

  fetchColors() async {
    final res = await repository.fetchColors();

    state = res;
  }
}
