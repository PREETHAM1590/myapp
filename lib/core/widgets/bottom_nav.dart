import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class BottomNav extends StatefulWidget {
  final Widget child;

  const BottomNav({super.key, required this.child});

  @override
  State<BottomNav> createState() => _BottomNavState();
}

class _BottomNavState extends State<BottomNav> {
  int _currentIndex = 0;

  void _onTap(int index) {
    if (index == 2) {
      context.go('/waste_scanning');
      return;
    }
    setState(() {
      _currentIndex = index;
    });
    switch (index) {
      case 0:
        context.go('/dashboard');
        break;
      case 1:
        context.go('/stats');
        break;
      case 3:
        context.go('/community');
        break;
      case 4:
        context.go('/profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.child,
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8.0,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            IconButton(
              icon: const Icon(Icons.home),
              onPressed: () => _onTap(0),
              color: _currentIndex == 0 ? Theme.of(context).primaryColor : Colors.grey,
            ),
            IconButton(
              icon: const Icon(Icons.bar_chart),
              onPressed: () => _onTap(1),
              color: _currentIndex == 1 ? Theme.of(context).primaryColor : Colors.grey,
            ),
            const SizedBox(width: 40), // The space for the FAB
            IconButton(
              icon: const Icon(Icons.people),
              onPressed: () => _onTap(3),
              color: _currentIndex == 3 ? Theme.of(context).primaryColor : Colors.grey,
            ),
            IconButton(
              icon: const Icon(Icons.person),
              onPressed: () => _onTap(4),
              color: _currentIndex == 4 ? Theme.of(context).primaryColor : Colors.grey,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.go('/waste_scanning'),
        child: const Icon(Icons.qr_code_scanner),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
