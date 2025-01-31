import 'dart:io';

import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/user/model/user_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'user_repository.g.dart';

final userRepositoryProvider = Provider<UserRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = UserRepository(dio, baseUrl: '$server/user');

  return repository;
});

@RestApi()
abstract class UserRepository {
  // http://$ip/user
  factory UserRepository(Dio dio, {String baseUrl}) = _UserRepository;

  @GET('/me')
  @Headers({
    'accessToken': 'true',
  })
  Future<UserModel> fetchUserInfo();

  @PATCH('/me')
  @Headers({'accessToken': 'true'})
  Future<UserModel> updateUserInfo(@Body() Map<String, dynamic> userUpdateData);

  @DELETE('/me')
  @Headers({'accessToken': 'true'})
  Future<void> deleteUserInfo();

  @PUT('/profile')
  @Headers({'accessToken': 'true'})
  Future<void> updateUserProfileImage(@Part() File profileImage);
}
