import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'consulting_message_comment_repository.g.dart';

final consultingMessageCommentRepositoryProvider =
    Provider<ConsultingMessageCommentRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = ConsultingMessageCommentRepository(dio,
      baseUrl: '$server/consulting-comment');

  return repository;
});

@RestApi()
abstract class ConsultingMessageCommentRepository {
  // http://$ip/consulting-comment
  factory ConsultingMessageCommentRepository(Dio dio, {String baseUrl}) =
      _ConsultingMessageCommentRepository;

  @POST('/{consultingId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<dynamic> createConsultingComment(
      @Path('consultingId') int id, @Body() Map<String, dynamic> body);
}
