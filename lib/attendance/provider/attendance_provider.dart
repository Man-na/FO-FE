import 'package:bluewhale_link/attendance/model/attendance_model.dart';
import 'package:bluewhale_link/attendance/repository/attendance_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final attendanceProvider = StateNotifierProvider<AttendanceStateNotifier, List<AttendanceModel>>((ref) {
  final repository = ref.watch(attendanceRepositoryProvider);

  final notifier = AttendanceStateNotifier(repository: repository);

  return notifier;
});

class AttendanceStateNotifier extends StateNotifier<List<AttendanceModel>> {
  final AttendanceRepository repository;

  AttendanceStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchAttendances();
  }

  fetchAttendances() async {
    final res = await repository.fetchAttendances();

    state = res;
  }
}
