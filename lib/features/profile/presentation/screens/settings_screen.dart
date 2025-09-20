import 'package:flutter/material.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const UserHeader(),
            const SizedBox(height: 24),
            SettingsSection(
              title: 'App Preferences',
              tiles: [
                const SettingsTile(
                    icon: Icons.notifications_outlined, title: 'Notifications'),
                SettingsTile(
                    icon: Icons.language_outlined,
                    title: 'Language',
                    trailing: const Text('English')),
                SettingsTile(
                    icon: Icons.color_lens_outlined,
                    title: 'Theme',
                    trailing: const Text('Light')),
              ],
            ),
            SettingsSection(
              title: 'Personalization',
              tiles: [
                const SettingsTile(
                    icon: Icons.dynamic_feed_outlined, title: 'Dynamic Theme'),
                const SettingsTile(icon: Icons.track_changes_outlined, title: 'Goals'),
              ],
            ),
            SettingsSection(
              title: 'Support & Information',
              tiles: [
                const SettingsTile(icon: Icons.help_outline, title: 'FAQ'),
                const SettingsTile(
                    icon: Icons.support_agent_outlined, title: 'Contact Support'),
                const SettingsTile(
                    icon: Icons.info_outline, title: 'About Waste Wise'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class UserHeader extends StatelessWidget {
  const UserHeader({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const CircleAvatar(
          radius: 30,
          backgroundColor: Colors.grey,
          child: Text('A', style: TextStyle(color: Colors.white, fontSize: 24)),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                'Alex Greenfield',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              Text(
                '"Trying to make the world a greener place, one bin at a time!"',
                style: TextStyle(color: Colors.grey, fontStyle: FontStyle.italic),
              ),
            ],
          ),
        ),
        IconButton(onPressed: () {}, icon: const Icon(Icons.edit_outlined)),
      ],
    );
  }
}

class SettingsSection extends StatelessWidget {
  final String title;
  final List<Widget> tiles;
  const SettingsSection({
    super.key,
    required this.title,
    required this.tiles,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),
        const SizedBox(height: 8),
        Card(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          child: Column(
            children: tiles,
          ),
        ),
        const SizedBox(height: 24),
      ],
    );
  }
}

class SettingsTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final Widget? trailing;

  const SettingsTile({
    super.key,
    required this.icon,
    required this.title,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: Colors.grey[600]),
      title: Text(title),
      trailing: trailing,
      onTap: () {},
    );
  }
}
