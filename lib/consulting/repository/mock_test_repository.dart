import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/consulting/model/mock_test_score_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'mock_test_repository.g.dart';

final mockTestRepositoryProvider = Provider<MockTestRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = MockTestRepository(dio, baseUrl: '$server/test/mock');

  return repository;
});

@RestApi()
abstract class MockTestRepository {
  // http://$ip/test/mock
  factory MockTestRepository(Dio dio, {String baseUrl}) = _MockTestRepository;

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<MockTestScoreModel>> fetchMockTests();

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<MockTestScoreModel> createMockTest(
    @Body() Map<String, dynamic> data,
  );

  @PATCH('/{mockTestId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<MockTestScoreModel> updateMockTest(
      @Path('mockTestId') int id, @Body() Map<String, dynamic> data);

  @DELETE('/{mockTestId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<MockTestScoreModel> deleteMockTest(@Path('mockTestId') int id);
}
