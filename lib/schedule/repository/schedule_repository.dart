import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:bluewhale_link/schedule/model/color_model.dart';
import 'package:bluewhale_link/schedule/model/schedule_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'schedule_repository.g.dart';

final scheduleRepositoryProvider = Provider<ScheduleRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = ScheduleRepository(dio, baseUrl: '$server/schedule');

  return repository;
});

@RestApi()
abstract class ScheduleRepository {
  // http://$ip/schedule
  factory ScheduleRepository(Dio dio, {String baseUrl}) = _ScheduleRepository;

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<ScheduleModel>> fetchSchedules();

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<void> createSchedule(@Body() Map<String, dynamic> data);

  @PATCH('/{scheduleId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<void> updateSchedule(@Path() int scheduleId, @Body() Map<String, dynamic> data);

  @DELETE('/{scheduleId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<void> deleteSchedule(@Path() int scheduleId);

  @GET('/color')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<ColorModel>> fetchColors();

  @GET('/{scheduleId}')
  @Headers({
    'accessToken': 'true',
  })
  Future<ScheduleModel> getOneSchedule({@Path() required String scheduleId});
}
