import 'package:bluewhale_link/schedule/model/schedule_model.dart';
import 'package:bluewhale_link/schedule/repository/schedule_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final scheduleProvider = StateNotifierProvider<ScheduleStateNotifier, List<ScheduleModel>>((ref) {
  final repository = ref.watch(scheduleRepositoryProvider);

  final notifier = ScheduleStateNotifier(repository: repository);

  return notifier;
});

class ScheduleStateNotifier extends StateNotifier<List<ScheduleModel>> {
  final ScheduleRepository repository;

  ScheduleStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchSchedules();
  }

  fetchSchedules() async {
    final res = await repository.fetchSchedules();

    state = res;
  }
}
