import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:bluewhale_link/consulting/model/mock_test_score_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MockTestGraph extends ConsumerStatefulWidget {
  final int selectedGrade;
  final int selectedSubjectIndex;
  final List<MockTestScoreModel> mockTestScores;

  const MockTestGraph({
    required this.selectedGrade,
    required this.selectedSubjectIndex,
    required this.mockTestScores,
    Key? key,
  }) : super(key: key);

  @override
  ConsumerState<MockTestGraph> createState() => _MockTestGraphState();
}

class _MockTestGraphState extends ConsumerState<MockTestGraph> {
  Set<double> allowedMonthsSet = {};

  @override
  void initState() {
    super.initState();
    setState(() {
      _updateAllowedMonths();
    });
  }

  @override
  void didUpdateWidget(covariant MockTestGraph oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.selectedGrade != oldWidget.selectedGrade ||
        widget.selectedSubjectIndex != oldWidget.selectedSubjectIndex ||
        widget.mockTestScores != oldWidget.mockTestScores) {
      _updateAllowedMonths();
    }
  }

  void _updateAllowedMonths() {
    Set<double> months = {};
    for (var score in widget.mockTestScores) {
      double monthValue = _monthToDouble(score.month.toString());
      months.add(monthValue);
    }
    allowedMonthsSet = months;
  }

  double _monthToDouble(String month) {
    return double.tryParse(month) ?? 0.0;
  }

  List<FlSpot> _getSpotsForSubject(int subject) {
    List<FlSpot> spots = [];

    for (var score in widget.mockTestScores) {
      if (score.subject == subject) {
        double monthValue = _monthToDouble(score.month.toString());
        if (allowedMonthsSet.contains(monthValue)) {
          double yValue = 7 - score.rank.toDouble();
          spots.add(FlSpot(monthValue, yValue));
        }
      }
    }

    return spots;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 20.0),
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: 200,
        child: LineChart(
          LineChartData(
            minX: 2,
            maxX: 12,
            minY: 1,
            maxY: 7,
            gridData: const FlGridData(show: true),
            titlesData: FlTitlesData(
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  reservedSize: 30,
                  getTitlesWidget: (value, meta) {
                    if (allowedMonthsSet.contains(value)) {
                      return Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Text('${value.toInt()}월'),
                      );
                    }
                    return const Text('');
                  },
                ),
              ),
              leftTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  reservedSize: 40,
                  getTitlesWidget: (value, meta) {
                    if (value >= 2 && value <= 6) {
                      int grade = 7 - value.toInt();
                      return Text('$grade등급');
                    }
                    return const Text('');
                  },
                ),
              ),
              topTitles: const AxisTitles(
                sideTitles: SideTitles(showTitles: false),
              ),
              rightTitles: const AxisTitles(
                sideTitles: SideTitles(showTitles: false),
              ),
            ),
            borderData: FlBorderData(show: true),
            lineBarsData: [
              _buildLineChartBarData(0, Colors.green), // 국어
              _buildLineChartBarData(1, Colors.blue),  // 영어
              _buildLineChartBarData(2, Colors.red),   // 수학
            ],
          ),
        ),
      ),
    );
  }

  LineChartBarData _buildLineChartBarData(int subjectIndex, Color color) {
    return LineChartBarData(
      spots: _getSpotsForSubject(subjectIndex),
      isCurved: false,
      barWidth: 2,
      color: color,
      belowBarData: BarAreaData(show: false),
    );
  }
}
