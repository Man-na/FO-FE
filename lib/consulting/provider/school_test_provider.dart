import 'package:bluewhale_link/consulting/model/school_test_score_model.dart';
import 'package:bluewhale_link/consulting/repository/school_test_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final schoolTestProvider = StateNotifierProvider<SchoolTestStateNotifier, List<SchoolTestScoreModel>>((ref) {
  final repository = ref.watch(schoolTestRepositoryProvider);

  final notifier = SchoolTestStateNotifier(repository: repository);

  return notifier;
});

class SchoolTestStateNotifier extends StateNotifier<List<SchoolTestScoreModel>> {
  final SchoolTestRepository repository;

  SchoolTestStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchSchoolTests();
  }

  fetchSchoolTests() async {
    final res = await repository.fetchSchoolTests();

    state = res;
  }

  Future<void> addSchoolTest(SchoolTestScoreModel score) async {
    try {
      var newScore = await repository.createSchoolTest(score.toMap());
      state = [...state, newScore];
        } catch (e) {
      print("내신 성적 추가 실패: $e");
    }
  }

  Future<void> updateSchoolTest(int id, SchoolTestScoreModel updatedScore) async {
    try {
      var newScore = await repository.updateSchoolTest(id, updatedScore.toMap());
      state = state.map((score) => score.id == id ? newScore : score).toList();
        } catch (e) {
      print("내신 성적 수정 실패: $e");
    }
  }

  Future<void> deleteSchoolTest(int id) async {
    try {
      await repository.deleteSchoolTest(id);
      state = state.where((score) => score.id != id).toList();
    } catch (e) {
      print("내신 성적 삭제 실패: $e");
    }
  }
}
