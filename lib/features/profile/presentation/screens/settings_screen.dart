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
            const SettingsSection(
              title: 'App Preferences',
              tiles: [
                SettingsTile(
                    icon: Icons.notifications_outlined, title: 'Notifications'),
                SettingsTile(
                    icon: Icons.language_outlined,
                    title: 'Language',
                    trailing: Text('English')),
                SettingsTile(
                    icon: Icons.color_lens_outlined,
                    title: 'Theme',
                    trailing: Text('Light')),
              ],
            ),
            const SettingsSection(
              title: 'Personalization',
              tiles: [
                SettingsTile(
                    icon: Icons.dynamic_feed_outlined, title: 'Dynamic Theme'),
                SettingsTile(icon: Icons.track_changes_outlined, title: 'Goals'),
              ],
            ),
            const SettingsSection(
              title: 'Support & Information',
              tiles: [
                SettingsTile(icon: Icons.help_outline, title: 'FAQ'),
                SettingsTile(
                    icon: Icons.support_agent_outlined, title: 'Contact Support'),
                SettingsTile(
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
        const Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
