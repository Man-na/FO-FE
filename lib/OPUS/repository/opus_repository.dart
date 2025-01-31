import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/OPUS/model/opus_model.dart';
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/schedule/model/color_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'opus_repository.g.dart';

final opusRepositoryProvider = Provider<OpusRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = OpusRepository(dio, baseUrl: '$server/opus');

  return repository;
});


@RestApi()
abstract class OpusRepository {
  // http://$ip/opus
  factory OpusRepository(Dio dio, {String baseUrl}) = _OpusRepository;

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<OpusModel>> fetchAllOpus();

  @GET('/color')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<ColorModel>> getColors();

  @GET('/{opusId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<OpusModel> fetchOneOpus({@Path() required String opusId});
}
