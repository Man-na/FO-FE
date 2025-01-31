import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/consulting/model/consulting_message_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'consulting_repository.g.dart';

final consultingRepositoryProvider = Provider<ConsultingRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = ConsultingRepository(dio, baseUrl: '$server/consulting');

  return repository;
});

@RestApi()
abstract class ConsultingRepository {
  // http://$ip/consulting
  factory ConsultingRepository(Dio dio, {String baseUrl}) = _ConsultingRepository;

  @GET('/')
  @Headers({'accessToken': 'true',})
  Future<List<ConsultingMessageModel>> fetchConsultingMessages();

  @GET('/{consultingId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ConsultingMessageModel> fetchOneConsultingMessage(
      @Path('consultingId') int id);

}
