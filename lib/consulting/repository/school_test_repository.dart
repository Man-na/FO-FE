import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/consulting/model/school_test_score_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'school_test_repository.g.dart';

final schoolTestRepositoryProvider = Provider<SchoolTestRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository =
      SchoolTestRepository(dio, baseUrl: '$server/test/school');

  return repository;
});

@RestApi()
abstract class SchoolTestRepository {
  // http://$ip/test/school
  factory SchoolTestRepository(Dio dio, {String baseUrl}) =
      _SchoolTestRepository;

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<SchoolTestScoreModel>> fetchSchoolTests();

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<SchoolTestScoreModel> createSchoolTest(
    @Body() Map<String, dynamic> data,
  );

  @PATCH('/{schoolTestId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<SchoolTestScoreModel> updateSchoolTest(
      @Path('schoolTestId') int id, @Body() Map<String, dynamic> data);

  @DELETE('/{schoolTestId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<SchoolTestScoreModel> deleteSchoolTest(@Path('schoolTestId') int id);
}
