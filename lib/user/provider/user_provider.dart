import 'package:bluewhale_link/user/model/user_model.dart';
import 'package:bluewhale_link/user/repository/user_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final userProvider = StateNotifierProvider<UserStateNotifier, UserModel>((ref) {
  final repository = ref.watch(userRepositoryProvider);

  final notifier = UserStateNotifier(repository: repository);

  return notifier;
});

class UserStateNotifier extends StateNotifier<UserModel> {
  final UserRepository repository;

  UserStateNotifier({
    required this.repository,
  }) : super(
    UserModel(
      userId: 0,
      userName: "",
      grade: 0,
      className: "",
      profileUrl: "",
      motto: "",
      role: "",
      isAccepted: false,
      studentId: 0,
    ),
  );

  fetchUserInfo() async {
    final res = await repository.fetchUserInfo();
    state = res;
  }

  void refreshUserInfo() {
    fetchUserInfo();
  }
}
