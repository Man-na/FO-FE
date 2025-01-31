import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/notification/model/notification_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'notification_repository.g.dart';

final notificationRepositoryProvider = Provider<NotificationRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = NotificationRepository(dio, baseUrl: '$server/notification');

  return repository;
});

@RestApi()
abstract class NotificationRepository {
  // http://$ip/notification
  factory NotificationRepository(Dio dio, {String baseUrl}) = _NotificationRepository;

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<NotificationModel>> fetchNotifications();

  @PUT('/{id}/read')
  @Headers({
    'accessToken': 'true',
  })
  Future<void> updateIsRead(@Path('id') int notificationId);
}
