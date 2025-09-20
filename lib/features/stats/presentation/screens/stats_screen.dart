import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class StatsScreen extends StatelessWidget {
  const StatsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Progress Report'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.more_horiz),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Activity Summary',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Row(
              children: const [
                Expanded(
                  child: SummaryCard(
                    value: '248',
                    label: 'Items Scanned',
                    color: Colors.green,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: SummaryCard(
                    value: '6',
                    label: 'Categories',
                    color: Colors.blue,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Waste Breakdown',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 250,
              child: WasteBreakdownChart(),
            ),
            const SizedBox(height: 24),
            const Text(
              'Eco-Points',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 200,
              child: EcoPointsChart(),
            ),
          ],
        ),
      ),
    );
  }
}

class SummaryCard extends StatelessWidget {
  final String value;
  final String label;
  final Color color;

  const SummaryCard({
    super.key,
    required this.value,
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              value,
              style: TextStyle(
                  fontSize: 40, fontWeight: FontWeight.bold, color: color),
            ),
            const SizedBox(height: 8),
            Text(label, style: const TextStyle(fontSize: 16, color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}

class WasteBreakdownChart extends StatelessWidget {
  const WasteBreakdownChart({super.key});

  @override
  Widget build(BuildContext context) {
    return PieChart(
      PieChartData(
        sections: [
          PieChartSectionData(
              color: Colors.green, value: 40, title: '40%', radius: 60),
          PieChartSectionData(
              color: Colors.blue, value: 35, title: '35%', radius: 60),
          PieChartSectionData(
              color: Colors.orange, value: 15, title: '15%', radius: 60),
          PieChartSectionData(
              color: Colors.red, value: 5, title: '5%', radius: 60),
          PieChartSectionData(
              color: Colors.grey, value: 5, title: '5%', radius: 60),
        ],
        centerSpaceRadius: 70,
        sectionsSpace: 4,
      ),
    );
  }
}

class EcoPointsChart extends StatelessWidget {
  const EcoPointsChart({super.key});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceAround,
        barGroups: [
          makeGroupData(0, 5),
          makeGroupData(1, 8),
          makeGroupData(2, 6),
          makeGroupData(3, 10),
          makeGroupData(4, 7),
          makeGroupData(5, 9),
          makeGroupData(6, 4),
        ],
        titlesData: FlTitlesData(
          leftTitles:
              const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles:
              const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          rightTitles:
              const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                const style = TextStyle(
                  color: Colors.grey,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                );
                Widget text;
                switch (value.toInt()) {
                  case 0:
                    text = const Text('M', style: style);
                    break;
                  case 1:
                    text = const Text('T', style: style);
                    break;
                  case 2:
                    text = const Text('W', style: style);
                    break;
                  case 3:
                    text = const Text('T', style: style);
                    break;
                  case 4:
                    text = const Text('F', style: style);
                    break;
                  case 5:
                    text = const Text('S', style: style);
                    break;
                  case 6:
                    text = const Text('S', style: style);
                    break;
                  default:
                    text = const Text('', style: style);
                    break;
                }
                return SideTitleWidget(
                  axisSide: meta.axisSide,
                  space: 16,
                  child: text,
                );
              },
            ),
          ),
        ),
      ),
    );
  }

  BarChartGroupData makeGroupData(int x, double y) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          toY: y,
          color: Colors.green,
          width: 15,
          borderRadius: BorderRadius.circular(4),
        ),
      ],
    );
  }
}
