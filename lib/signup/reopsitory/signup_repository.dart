import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/signup/model/check_email_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'signup_repository.g.dart';

final signupRepositoryProvider = Provider<SignupRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = SignupRepository(dio, baseUrl: '$server/user');

  return repository;
});

@RestApi()
abstract class SignupRepository {
  // http://$ip/user
  factory SignupRepository(Dio dio, {String baseUrl}) = _SignupRepository;

  @POST('/signup')
  Future<void> signupStudent(@Body() Map<String, dynamic> data);

  @POST('/checkEmail')
  Future<CheckEmailModel> checkEmailDuplication(@Body() Map<String, dynamic> emailData);
}
