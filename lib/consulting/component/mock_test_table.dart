import 'package:flutter/material.dart';
import 'package:bluewhale_link/consulting/model/mock_test_score_model.dart';
import 'package:bluewhale_link/consulting/provider/mock_test_provider.dart';
import 'package:bluewhale_link/consulting/repository/mock_test_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MockTestTable extends ConsumerStatefulWidget {
  final int selectedGrade;
  final int selectedSubjectIndex;
  final List<MockTestScoreModel> mockTestScores;

  const MockTestTable({
    required this.selectedGrade,
    required this.selectedSubjectIndex,
    required this.mockTestScores,
    Key? key,
  }) : super(key: key);

  @override
  ConsumerState createState() => _MockTestTableState();
}

class _MockTestTableState extends ConsumerState<MockTestTable> {
  bool newRowAdded = false;
  Map<int, TextEditingController> controllers = {};

  int? editingRow;

  Future<MockTestScoreModel?> createMockTest() async {
    Map<String, dynamic> data = {
      'grade': widget.selectedGrade,
      'subject': widget.selectedSubjectIndex,
    };

    var lastScore = widget.mockTestScores.last;
    data['month'] = lastScore.monthController.text;
    data['originalScore'] = lastScore.originalScoreController.text;
    data['standardScore'] = lastScore.standardScoreController.text;
    data['percentage'] = lastScore.percentageController.text;
    data['rank'] = lastScore.rankController.text;

    try {
      return ref.watch(mockTestRepositoryProvider).createMockTest(data);
    } catch (e) {
      print("모의고사 성적 생성에 실패하였습니다. $e");
      rethrow;
    }
  }

  Future<MockTestScoreModel?> updateMockTest() async {
    if (editingRow == null || editingRow! >= widget.mockTestScores.length) {
      print("Invalid editing row");
      return null;
    }

    var score = widget.mockTestScores[editingRow!];
    Map<String, dynamic> data = {
      'month': score.monthController.text,
      'originalScore': score.originalScoreController.text,
      'standardScore': score.standardScoreController.text,
      'percentage': score.percentageController.text,
      'rank': score.rankController.text,
    };

    try {
      return ref
          .watch(mockTestRepositoryProvider)
          .updateMockTest(score.id!, data);
    } catch (e) {
      print("모의고사 성적 수정에 실패했습니다. $e");
      rethrow;
    }
  }

  Future<MockTestScoreModel?> deleteMockTest(int id) async {
    try {
      return ref.watch(mockTestRepositoryProvider).deleteMockTest(id);
    } catch (e) {
      print("모의고사 성적 삭제에 실패하였습니다. $e");
      rethrow;
    }
  }

  @override
  void initState() {
    super.initState();
    newRowAdded = false;
  }

  @override
  void didUpdateWidget(covariant MockTestTable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.selectedGrade != oldWidget.selectedGrade ||
        widget.selectedSubjectIndex != oldWidget.selectedSubjectIndex) {
      newRowAdded = false;
      controllers.clear();
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
    var newModel = MockTestScoreModel();
    newModel.monthController = TextEditingController();
    newModel.originalScoreController = TextEditingController();
    newModel.standardScoreController = TextEditingController();
    newModel.percentageController = TextEditingController();
    newModel.rankController = TextEditingController();

    setState(() {
      widget.mockTestScores.add(MockTestScoreModel());
      newRowAdded = true;
      editingRow = widget.mockTestScores.length - 1;
    });
  }

  void _saveNewRow() async {
    if (newRowAdded) {
      var lastScore = widget.mockTestScores.last;
      if (lastScore.monthController.text.isEmpty ||
          lastScore.originalScoreController.text.isEmpty ||
          lastScore.standardScoreController.text.isEmpty ||
          lastScore.percentageController.text.isEmpty ||
          lastScore.rankController.text.isEmpty) {
        _showAlert(context, '정보를 모두 입력해주세요');
        return;
      }

      var newScore = await createMockTest();
      if (newScore != null) {
        ref.read(mockTestProvider.notifier).addMockTest(newScore);
      }
    } else if (editingRow != null) {
      var updatedScore = await updateMockTest();
      if (updatedScore != null) {
        ref
            .read(mockTestProvider.notifier)
            .updateMockTest(updatedScore.id!, updatedScore);
      }
    }

    setState(() {
      newRowAdded = false;
      editingRow = null;
    });
  }

  void _showAlert(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('안내'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: const Text('확인'),
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
    var scoreId = widget.mockTestScores[rowIndex].id;

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
      await ref.read(mockTestProvider.notifier).deleteMockTest(scoreId);
    }
  }

  Widget _buildEditButtons(int index) {
    if (editingRow != null && editingRow != index) {
      return const SizedBox();
    }

    if (newRowAdded && index == widget.mockTestScores.length - 1) {
      return IconButton(
        icon: const Icon(Icons.check),
        onPressed: _saveNewRow,
      );
    }

    if (editingRow == index) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: const Icon(Icons.check),
            onPressed: _saveNewRow,
          ),
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: _cancelEditing,
          ),
        ],
      );
    } else {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () => _startEditing(index),
          ),
          IconButton(
            icon: const Icon(Icons.delete),
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
              label: Center(child: Text('월', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('원점수', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('표준점수', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('백분위', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('등급', textAlign: TextAlign.center))),
          DataColumn(
              label: Center(child: Text('', textAlign: TextAlign.center))),
        ],
        rows: List.generate(
          widget.mockTestScores.length,
          (index) {
            var score = widget.mockTestScores[index];
            bool isRowEditable =
                newRowAdded && index == widget.mockTestScores.length - 1;
            bool isRowEditing = editingRow == index;

            return DataRow(
              cells: <DataCell>[
                DataCell(isRowEditable || isRowEditing
                    ? TextField(
                        controller: score.monthController,
                        decoration: const InputDecoration(hintText: '월 입력'),
                        textAlign: TextAlign.center,
                        keyboardType: TextInputType.number,
                      )
                    : Center(
                        child: Text(
                        '${score.month}월',
                        textAlign: TextAlign.center,
                      ))),
                DataCell(isRowEditable || isRowEditing
                    ? TextField(
                        controller: score.originalScoreController,
                        decoration: const InputDecoration(hintText: '원점수 입력'),
                        textAlign: TextAlign.center,
                        keyboardType: TextInputType.number,
                      )
                    : Center(
                        child: Text(
                        score.originalScore.toString(),
                        textAlign: TextAlign.center,
                      ))),
                DataCell(isRowEditable || isRowEditing
                    ? TextField(
                        controller: score.standardScoreController,
                        decoration: const InputDecoration(hintText: '표준점수 입력'),
                        textAlign: TextAlign.center,
                        keyboardType: TextInputType.number,
                      )
                    : Center(
                        child: Text(
                        score.standardScore.toString(),
                        textAlign: TextAlign.center,
                      ))),
                DataCell(isRowEditable || isRowEditing
                    ? TextField(
                        controller: score.percentageController,
                        decoration: const InputDecoration(hintText: '백분위 입력'),
                        textAlign: TextAlign.center,
                        keyboardType: TextInputType.number,
                      )
                    : Center(
                        child: Text(
                        score.percentage.toString(),
                        textAlign: TextAlign.center,
                      ))),
                DataCell(isRowEditable || isRowEditing
                    ? TextField(
                        controller: score.rankController,
                        decoration: const InputDecoration(hintText: '등급 입력'),
                        textAlign: TextAlign.center,
                        keyboardType: TextInputType.number,
                      )
                    : Center(
                        child: Text(
                        score.rank.toString(),
                        textAlign: TextAlign.center,
                      ))),
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
