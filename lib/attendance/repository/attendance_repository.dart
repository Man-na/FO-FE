import 'package:dio/dio.dart' hide Headers;
import 'package:bluewhale_link/attendance/model/attendance_model.dart';
import 'package:bluewhale_link/common/const/data.dart';
import 'package:bluewhale_link/common/dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';

part 'attendance_repository.g.dart';

final attendanceRepositoryProvider = Provider<AttendanceRepository>((ref) {
  final dio = ref.watch(dioProvider);

  final repository = AttendanceRepository(dio, baseUrl: '$server/attendance');

  return repository;
});

@RestApi()
abstract class AttendanceRepository {
  // http://$ip/attendance
  factory AttendanceRepository(Dio dio, {String baseUrl}) = _AttendanceRepository;

  @POST('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<void> createAttendance(@Body() Map<String, dynamic> data);

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<List<AttendanceModel>> fetchAttendances();
}
