import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:myapp/core/widgets/bottom_nav.dart';
import 'package:myapp/features/authentication/presentation/screens/login_screen.dart';
import 'package:myapp/features/chatbot/presentation/screens/chatbot_screen.dart';
import 'package:myapp/features/dashboard/presentation/screens/dashboard_screen.dart';
import 'package:myapp/features/gamification/presentation/screens/leaderboard_screen.dart';
import 'package:myapp/features/marketplace/presentation/screens/marketplace_screen.dart';
import 'package:myapp/features/profile/presentation/screens/profile_screen.dart';
import 'package:myapp/features/tracking/presentation/screens/tracking_screen.dart';
import 'package:myapp/features/wallet/presentation/screens/wallet_screen.dart';

final GoRouter router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const BottomNav(),
      routes: [
        GoRoute(
          path: 'login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: 'chatbot',
          builder: (context, state) => const ChatbotScreen(),
        ),
        GoRoute(
          path: 'dashboard',
          builder: (context, state) => const DashboardScreen(),
        ),
        GoRoute(
          path: 'leaderboard',
          builder: (context, state) => const LeaderboardScreen(),
        ),
        GoRoute(
          path: 'marketplace',
          builder: (context, state) => const MarketplaceScreen(),
        ),
        GoRoute(
          path: 'profile',
          builder: (context, state) => const ProfileScreen(),
        ),
        GoRoute(
          path: 'tracking',
          builder: (context, state) => const TrackingScreen(),
        ),
        GoRoute(
          path: 'wallet',
          builder: (context, state) => const WalletScreen(),
        ),
      ],
    ),
  ],
);
