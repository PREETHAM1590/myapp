import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class CommunityScreen extends StatelessWidget {
  const CommunityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Community'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Top navigation tabs can be added here
            const SizedBox(height: 16),
            FeatureCard(
              icon: Icons.store_outlined,
              title: 'Eco Marketplace',
              subtitle: 'Sustainable products and recycled materials',
              onTap: () {
                 GoRouter.of(context).push('/marketplace');
              },
            ),
            FeatureCard(
              icon: Icons.emoji_events_outlined,
              title: 'Community Challenges',
              subtitle: 'Join challenges and earn rewards',
              onTap: () {
                GoRouter.of(context).push('/challenges');
              },
            ),
            FeatureCard(
              icon: Icons.school_outlined,
              title: 'Learn & Grow',
              subtitle: 'Recycling guides and environmental tips',
              onTap: () {
                GoRouter.of(context).push('/learn');
              },
            ),
            FeatureCard(
              icon: Icons.account_balance_wallet_outlined,
              title: 'Web3 Wallet',
              subtitle: 'Manage your ECO tokens and transactions',
              onTap: () {
                GoRouter.of(context).push('/wallet');
              },
            ),
          ],
        ),
      ),
    );
  }
}

class FeatureCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const FeatureCard({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      margin: const EdgeInsets.only(bottom: 16),
      child: ListTile(
        leading: Icon(icon, size: 40, color: Colors.blueAccent),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.arrow_forward_ios),
        onTap: onTap,
      ),
    );
  }
}
