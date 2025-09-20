import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:myapp/features/authentication/presentation/screens/login_screen.dart';
import 'package:myapp/features/community/presentation/screens/challenges_screen.dart';
import 'package:myapp/features/community/presentation/screens/community_screen.dart';
import 'package:myapp/features/community/presentation/screens/learn_screen.dart';
import 'package:myapp/features/dashboard/presentation/screens/dashboard_screen.dart';
import 'package:myapp/features/marketplace/presentation/screens/marketplace_screen.dart';
import 'package:myapp/features/profile/presentation/screens/profile_screen.dart';
import 'package:myapp/features/profile/presentation/screens/settings_screen.dart';
import 'package:myapp/features/stats/presentation/screens/stats_screen.dart';
import 'package:myapp/features/wallet/presentation/screens/wallet_screen.dart';
import 'package:myapp/features/wallet/presentation/screens/wallet_test_screen.dart';
import 'package:myapp/features/waste_scanning/presentation/screens/waste_scanning_screen.dart';
import 'package:myapp/core/widgets/bottom_nav.dart';

class AppRouter {
  static final _rootNavigatorKey = GlobalKey<NavigatorState>();
  static final _shellNavigatorKey = GlobalKey<NavigatorState>();

  static final GoRouter router = GoRouter(
    initialLocation: '/wallet-test',
    navigatorKey: _rootNavigatorKey,
    routes: [
       GoRoute(
        path: '/wallet-test',
        builder: (context, state) => const WalletTestScreen(),
      ),
      GoRoute(
        path: '/',
        builder: (context, state) => const LoginScreen(),
      ),
      ShellRoute(
        navigatorKey: _shellNavigatorKey,
        builder: (context, state, child) {
          return BottomNav(child: child);
        },
        routes: [
          GoRoute(
            path: '/dashboard',
            builder: (context, state) => const DashboardScreen(),
          ),
          GoRoute(
            path: '/stats',
            builder: (context, state) => const StatsScreen(),
          ),
          GoRoute(
            path: '/community',
            builder: (context, state) => const CommunityScreen(),
          ),
          GoRoute(
            path: '/profile',
            builder: (context, state) => const ProfileScreen(),
          ),
        ],
      ),
      GoRoute(
        path: '/waste_scanning',
        builder: (context, state) => const WasteScanningScreen(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
      GoRoute(
        path: '/marketplace',
        builder: (context, state) => const MarketplaceScreen(),
      ),
      GoRoute(
        path: '/challenges',
        builder: (context, state) => const ChallengesScreen(),
      ),
      GoRoute(
        path: '/learn',
        builder: (context, state) => const LearnScreen(),
      ),
      GoRoute(
        path: '/wallet',
        builder: (context, state) => const WalletScreen(),
      ),
    ],
  );
}
