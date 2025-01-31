// import 'package:flutter/material.dart';
// import 'package:flutter_nest_frontend/consulting/component/consulting_tab.dart';
// import 'package:flutter_nest_frontend/consulting/component/mock_test_graph.dart';
// import 'package:flutter_nest_frontend/consulting/component/mock_test_table.dart';
// import 'package:flutter_nest_frontend/consulting/component/school_test_table.dart';
// import 'package:flutter_nest_frontend/consulting/model/mock_test_score_model.dart';
// import 'package:flutter_nest_frontend/consulting/provider/mock_test_provider.dart';
// import 'package:flutter_nest_frontend/consulting/provider/school_test_provider.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
//
// class ConsultingScreen extends ConsumerStatefulWidget {
//   const ConsultingScreen({Key? key}) : super(key: key);
//
//   @override
//   ConsumerState<ConsultingScreen> createState() => _ConsultingScreenState();
// }
//
// class _ConsultingScreenState extends ConsumerState<ConsultingScreen> {
//   bool isSchoolTestSelected = true;
//   bool isMockTestSelected = false;
//
//   int selectedGrade = 1;
//   List<bool> subjectSelected = List.generate(5, (_) => false);
//   int selectedSubjectIndex = 0;
//
//   List<String> schoolTests = [
//     '1학기\n중간고사',
//     '1학기\n기말고사',
//     '2학기\n중간고사',
//     '2학기\n기말고사'
//   ];
//   int selectedSchoolTestIndex = 0;
//   List<MockTestScoreModel> mockTestScores = [];
//
//   @override
//   Widget build(BuildContext context) {
//     final mockTestData = ref.watch(mockTestProvider);
//     final filteredMockTestScores = mockTestData
//         .where((score) =>
//             score.grade == selectedGrade &&
//             score.subject == selectedSubjectIndex)
//         .toList();
//
//     final filteredByGradeMockTestScores =
//         mockTestData.where((score) => score.grade == selectedGrade).toList();
//
//     final schoolTestData = ref.watch(schoolTestProvider);
//     final filteredSchoolTestScores = schoolTestData
//         .where((score) =>
//             score.grade == selectedGrade &&
//             score.testType == selectedSchoolTestIndex)
//         .toList();
//
//     return Scaffold(
//       body: SingleChildScrollView(
//         child: Column(
//           children: <Widget>[
//             Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: <Widget>[
//                 ElevatedButton(
//                   onPressed: () {
//                     setState(() {
//                       isSchoolTestSelected = true;
//                       isMockTestSelected = false;
//                     });
//                   },
//                   child: const Text('내신'),
//                   style: ElevatedButton.styleFrom(
//                     primary: isSchoolTestSelected ? Color(0xFF0D2547) : null,
//                   ),
//                 ),
//                 const SizedBox(width: 8),
//                 ElevatedButton(
//                   onPressed: () {
//                     setState(() {
//                       isSchoolTestSelected = false;
//                       isMockTestSelected = true;
//                     });
//                   },
//                   child: const Text('모의고사'),
//                   style: ElevatedButton.styleFrom(
//                     primary: isMockTestSelected ? Color(0xFF0D2547) : null,
//                   ),
//                 ),
//                 const SizedBox(width: 8),
//                 ElevatedButton(
//                   onPressed: () {
//                     Navigator.of(context).push(
//                         MaterialPageRoute(builder: (_) => ConsultingTab()));
//                   },
//                   child: const Text('컨설팅'),
//                   style: ElevatedButton.styleFrom(),
//                 ),
//               ],
//             ),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: <Widget>[
//                 _gradeButton(1),
//                 const SizedBox(width: 8),
//                 _gradeButton(2),
//                 const SizedBox(width: 8),
//                 _gradeButton(3),
//               ],
//             ),
//             if (isSchoolTestSelected)
//               Wrap(
//                 spacing: 8.0,
//                 children: List.generate(schoolTests.length, (index) {
//                   return _schoolTestButton(index);
//                 }),
//               ),
//             if (isSchoolTestSelected)
//               SchoolTestTable(
//                 selectedGrade: selectedGrade,
//                 selectedSchoolTestIndex: selectedSchoolTestIndex,
//                 schoolTestScores: filteredSchoolTestScores,
//               ),
//             if (isMockTestSelected) const SizedBox(height: 16),
//             if (isMockTestSelected)
//               MockTestGraph(
//                 selectedSubjectIndex: selectedSubjectIndex,
//                 selectedGrade: selectedGrade,
//                 mockTestScores: filteredByGradeMockTestScores,
//               ),
//             if (isMockTestSelected) const SizedBox(height: 8),
//             if (isMockTestSelected) _mockTestSubjectButton(),
//             if (isMockTestSelected)
//               MockTestTable(
//                 selectedSubjectIndex: selectedSubjectIndex,
//                 selectedGrade: selectedGrade,
//                 mockTestScores: filteredMockTestScores,
//               ),
//           ],
//         ),
//       ),
//     );
//   }
//
//   Widget _gradeButton(int grade) {
//     return ElevatedButton(
//       onPressed: () {
//         setState(() {
//           selectedGrade = grade;
//         });
//       },
//       child: Text('${grade}학년'),
//       style: ElevatedButton.styleFrom(
//         primary: selectedGrade == grade ? Color(0xFF0D2547) : null,
//       ),
//     );
//   }
//
//   Widget _mockTestSubjectButton() {
//     List<String> subjects = ['국어', '영어', '수학'];
//     return Wrap(
//       spacing: 8.0,
//       alignment: WrapAlignment.center,
//       children: subjects.asMap().entries.map((entry) {
//         int idx = entry.key;
//         String subject = entry.value;
//         return ElevatedButton(
//           onPressed: () {
//             setState(() {
//               selectedSubjectIndex = idx;
//             });
//           },
//           child: Text(subject),
//           style: ElevatedButton.styleFrom(
//             primary: idx == selectedSubjectIndex ? Color(0xFF0D2547) : null,
//           ),
//         );
//       }).toList(),
//     );
//   }
//
//   Widget _schoolTestButton(int index) {
//     String test = schoolTests[index];
//     return ElevatedButton(
//       onPressed: () {
//         setState(() {
//           selectedSchoolTestIndex = index;
//         });
//       },
//       child: Text(test, textAlign: TextAlign.center),
//       style: ElevatedButton.styleFrom(
//         primary: selectedSchoolTestIndex == index ? Color(0xFF0D2547) : null,
//       ),
//     );
//   }
// }
