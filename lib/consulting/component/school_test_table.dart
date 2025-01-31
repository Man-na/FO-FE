import 'package:flutter/material.dart';
import 'package:bluewhale_link/consulting/model/school_test_score_model.dart';
import 'package:bluewhale_link/consulting/provider/school_test_provider.dart';
import 'package:bluewhale_link/consulting/repository/school_test_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SchoolTestTable extends ConsumerStatefulWidget {
  final int selectedGrade;
  final int selectedSchoolTestIndex;
  final List<SchoolTestScoreModel> schoolTestScores;

  const SchoolTestTable({
    required this.selectedGrade,
    required this.selectedSchoolTestIndex,
    required this.schoolTestScores,
    Key? key,
  }) : super(key: key);

  @override
  ConsumerState createState() => _SchoolTestTableState();
}

class _SchoolTestTableState extends ConsumerState<SchoolTestTable> {
  bool newRowAdded = false;
  Map<int, TextEditingController> controllers = {};
  bool isEditing = false;

  int? editingRow;

  Future<List<SchoolTestScoreModel>> fetchSchoolTests() async {
    return ref.watch(schoolTestRepositoryProvider).fetchSchoolTests();
  }

  Future<SchoolTestScoreModel?> createSchoolTest() async {
    Map<String, dynamic> data = {
      'grade': widget.selectedGrade,
      'testType': widget.selectedSchoolTestIndex,
    };

    var lastScore = widget.schoolTestScores.last;
    data['subject'] = lastScore.subjectController.text;
    data['classHours'] = lastScore.classHoursController.text;
    data['score'] = lastScore.scoreController.text;
    data['rank'] = lastScore.rankController.text;
    data['totalStudent'] = lastScore.totalStudentController.text;

    try {
      return ref.watch(schoolTestRepositoryProvider).createSchoolTest(data);
    } catch (e) {
      print("내신 성적 생성에 실패하였습니다. $e");
      throw e;
    }
  }

  Future<SchoolTestScoreModel?> updateSchoolTest() async {
    if (editingRow == null || editingRow! >= widget.schoolTestScores.length) {
      print("수정할 수 없는 row입니다.");
      return null;
    }

    var score = widget.schoolTestScores[editingRow!];
    Map<String, dynamic> data = {
      'subject': score.subjectController.text,
      'classHours': score.classHoursController.text,
      'score': score.scoreController.text,
      'rank': score.rankController.text,
      'totalStudent': score.totalStudentController.text,
    };

    try {
      return ref
          .watch(schoolTestRepositoryProvider)
          .updateSchoolTest(score.id!, data);
    } catch (e) {
      print("내신 성적 수정에 실패하였습니다. $e");
      throw e;
    }
  }

  Future<SchoolTestScoreModel?> deleteSchoolTest(int id) async {
    try {
      return ref.watch(schoolTestRepositoryProvider).deleteSchoolTest(id);
    } catch (e) {
      print("내신 성적 삭제에 실패하였습니다. $e");
      throw e;
    }
  }

  @override
  void initState() {
    super.initState();
    newRowAdded = false;
  }

  @override
  void didUpdateWidget(covariant SchoolTestTable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.selectedGrade != oldWidget.selectedGrade ||
        widget.selectedSchoolTestIndex != oldWidget.selectedSchoolTestIndex) {
      newRowAdded = false;
      controllers.clear();

      setState(() {
        isEditing = false;
      });
    }
  }

  @override
  void dispose() {
    for (var controller in controllers.values) {
      controller.dispose();
    }

    newRowAdded = false;
    super.dispose();
  }

  void _addNewRow() {
    var newModel = SchoolTestScoreModel();
    newModel.subjectController = TextEditingController();
    newModel.classHoursController = TextEditingController();
    newModel.scoreController = TextEditingController();
    newModel.rankController = TextEditingController();
    newModel.totalStudentController = TextEditingController();

    setState(() {
      widget.schoolTestScores.add(newModel);
      newRowAdded = true;
      isEditing = true;
    });
  }

  void _saveNewRow() async {
    try {
      if (newRowAdded) {
        var lastScore = widget.schoolTestScores.last;
        if (lastScore.subjectController.text.isEmpty ||
            lastScore.classHoursController.text.isEmpty ||
            lastScore.scoreController.text.isEmpty ||
            lastScore.rankController.text.isEmpty ||
            lastScore.totalStudentController.text.isEmpty) {
          _showAlert(context, '정보를 모두 입력해주세요');
          return;
        }

        var newScore = await createSchoolTest();
        if (newScore != null) {
          ref.read(schoolTestProvider.notifier).addSchoolTest(newScore);
        }
      } else if (editingRow != null) {
        var updatedScore = await updateSchoolTest();
        if (updatedScore != null) {
          ref
              .read(schoolTestProvider.notifier)
              .updateSchoolTest(updatedScore.id!, updatedScore);
        }
      }

      setState(() {
        newRowAdded = false;
        editingRow = null;
        isEditing = false;
      });
    } catch (e) {
      print("Error saving row: $e");
    }
  }

  void _showAlert(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('안내'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: Text('확인'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _startEditing(int index) {
    setState(() {
      editingRow = index;
    });
  }

  void _cancelEditing() {
    setState(() {
      editingRow = null;
    });
  }

  void _deleteRow(int rowIndex) async {
    var scoreId = widget.schoolTestScores[rowIndex].id;

    bool? confirmDelete = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('삭제 확인'),
          content: const Text('이 성적을 삭제하시겠습니까?'),
          actions: <Widget>[
            TextButton(
              child: const Text('취소'),
              onPressed: () {
                Navigator.of(context).pop(false);
              },
            ),
            TextButton(
              child: const Text('삭제'),
              onPressed: () {
                Navigator.of(context).pop(true);
              },
            ),
          ],
        );
      },
    );

    if (confirmDelete == true && scoreId != null) {
      await deleteSchoolTest(scoreId);
      setState(() {
        widget.schoolTestScores.removeAt(rowIndex);
      });
    }
  }

  Widget _buildEditButtons(int index) {
    if (editingRow != null && editingRow != index) {
      return SizedBox();
    }

    if (newRowAdded && index == widget.schoolTestScores.length - 1) {
      return IconButton(
        icon: Icon(Icons.check),
        onPressed: _saveNewRow,
      );
    }

    if (editingRow == index) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: Icon(Icons.check),
            onPressed: _saveNewRow,
          ),
          IconButton(
            icon: Icon(Icons.close),
            onPressed: _cancelEditing,
          ),
        ],
      );
    } else {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: Icon(Icons.edit),
            onPressed: () => _startEditing(index),
          ),
          IconButton(
            icon: Icon(Icons.delete),
            onPressed: () => _deleteRow(index),
          ),
        ],
      );
    }
  }

  Widget buildDataTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columns: const <DataColumn>[
          DataColumn(
              label: Center(child: Text('과목', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('수업시수', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('원점수', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('등수', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('전체인원', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('', textAlign: TextAlign.center))),
        ],
        rows: List.generate(
          widget.schoolTestScores.length,
          (index) {
            final score = widget.schoolTestScores[index];
            bool isRowEditable =
                newRowAdded && index == widget.schoolTestScores.length - 1;
            bool isRowEditing = editingRow == index;

            return DataRow(
              cells: <DataCell>[
                DataCell(
                  isRowEditable || isRowEditing
                      ? TextField(
                          controller: score.subjectController,
                          decoration: InputDecoration(
                            hintText: '과목 입력',
                          ),
                          textAlign: TextAlign.center,
                        )
                      : Center(child: Text(score.subject)),
                ),
                DataCell(
                  isRowEditable || isRowEditing
                      ? TextField(
                          controller: score.classHoursController,
                          decoration: InputDecoration(
                            hintText: '수업시수 입력',
                          ),
                          textAlign: TextAlign.center,
                          keyboardType: TextInputType.number,
                        )
                      : Center(
                          child: Text(
                            '${score.classHours}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                ),
                DataCell(
                  isRowEditable || isRowEditing
                      ? TextField(
                          controller: score.scoreController,
                          decoration: InputDecoration(
                            hintText: '원점수 입력',
                          ),
                          textAlign: TextAlign.center,
                          keyboardType: TextInputType.number,
                        )
                      : Center(
                          child: Text(
                            '${score.score}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                ),
                DataCell(
                  isRowEditable || isRowEditing
                      ? TextField(
                          controller: score.rankController,
                          decoration: InputDecoration(
                            hintText: '등수 입력',
                          ),
                          textAlign: TextAlign.center,
                          keyboardType: TextInputType.number,
                        )
                      : Center(
                          child: Text(
                            '${score.rank}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                ),
                DataCell(
                  isRowEditable || isRowEditing
                      ? TextField(
                          controller: score.totalStudentController,
                          decoration: InputDecoration(
                            hintText: '전체인원 입력',
                          ),
                          textAlign: TextAlign.center,
                          keyboardType: TextInputType.number,
                        )
                      : Center(
                          child: Text(
                            '${score.totalStudent}',
                            textAlign: TextAlign.center,
                          ),
                        ),
                ),
                DataCell(_buildEditButtons(index)),
              ],
            );
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        buildDataTable(),
        if (!newRowAdded && editingRow == null)
          ElevatedButton(
            onPressed: _addNewRow,
            child: const Icon(Icons.add),
          ),
      ],
    );
  }
}
