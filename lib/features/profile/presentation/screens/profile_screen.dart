import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Welcome back,\nPreetham', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.edit_outlined)),
          IconButton(
              onPressed: () {
                // Navigate to Settings Screen
                // This will be a separate top-level route
                GoRouter.of(context).push('/settings');
              },
              icon: const Icon(Icons.settings_outlined)),
          IconButton(
              onPressed: () {}, icon: const Icon(Icons.notifications_outlined)),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 50,
              backgroundColor: Colors.blueAccent,
              child: Text('P', style: TextStyle(fontSize: 40, color: Colors.white)),
            ),
            const SizedBox(height: 16),
            const Text(
              'Preetham V',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const Text('studiousgaming15@gmail.com', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.edit, color: Colors.white),
              label: const Text('Edit Profile', style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
              ),
            ),
            const SizedBox(height: 24),
            Row(
              children: const [
                Expanded(child: InfoCard(title: 'Eco-Points', value: '1,250', icon: Icons.eco, iconColor: Colors.green,)),
                SizedBox(width: 16),
                Expanded(child: InfoCard(title: 'Achievements', value: '3 / 15', icon: Icons.emoji_events, iconColor: Colors.orange,)),
              ],
            ),
            const SizedBox(height: 24),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'History',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            const HistoryCard(),
            const HistoryCard(
              icon: Icons.battery_charging_full,
              title: 'Old Battery',
              subtitle: 'Hazardous Waste',
              time: '1 week ago',
            ),
            TextButton(
              onPressed: () {},
              child: const Text('View All History'),
            ),
          ],
        ),
      ),
    );
  }
}

class InfoCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color iconColor;

  const InfoCard({
    super.key,
    required this.title,
    required this.value,
    required this.icon,
    required this.iconColor,
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
            Icon(icon, color: iconColor, size: 30),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
            const SizedBox(height: 8),
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}

class HistoryCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final String time;

  const HistoryCard({
    super.key,
    this.icon = Icons.recycling,
    this.title = 'Plastic Bottle',
    this.subtitle = 'Recyclable',
    this.time = '2 days ago',
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      margin: const EdgeInsets.only(bottom: 16),
      child: ListTile(
        leading: Icon(icon, size: 40, color: Colors.green),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        trailing: Text(time, style: const TextStyle(color: Colors.grey)),
      ),
    );
  }
}
