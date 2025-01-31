import 'package:bluewhale_link/consulting/model/mock_test_score_model.dart';
import 'package:bluewhale_link/consulting/repository/mock_test_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final mockTestProvider = StateNotifierProvider<MockTestStateNotifier, List<MockTestScoreModel>>((ref) {
  final repository = ref.watch(mockTestRepositoryProvider);

  final notifier = MockTestStateNotifier(repository: repository);

  return notifier;
});

class MockTestStateNotifier extends StateNotifier<List<MockTestScoreModel>> {
  final MockTestRepository repository;

  MockTestStateNotifier({
    required this.repository,
  }) : super([]) {
    fetchMockTests();
  }

  fetchMockTests() async {
    final res = await repository.fetchMockTests();

    state = res;
  }

  Future<void> addMockTest(MockTestScoreModel score) async {
    try {
      var newScore = await repository.createMockTest(score.toMap());
      if (newScore != null) {
        state = [...state, newScore];
      }
    } catch (e) {
      print("모의고사 성적 추가 실패: $e");
    }
  }

  Future<void> updateMockTest(int id, MockTestScoreModel updatedScore) async {
    try {
      var newScore = await repository.updateMockTest(id, updatedScore.toMap());
      if (newScore != null) {
        state = state.map((score) => score.id == id ? newScore : score).toList();
      }
    } catch (e) {
      print("모의고사 성적 수정 실패: $e");
    }
  }

  Future<void> deleteMockTest(int id) async {
    try {
      await repository.deleteMockTest(id);
      state = state.where((score) => score.id != id).toList();
    } catch (e) {
      print("모의고사 성적 삭제 실패: $e");
    }
  }
}
