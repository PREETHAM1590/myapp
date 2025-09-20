import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:myapp/core/config/app_router.dart';
import 'package:myapp/core/config/theme.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:myapp/features/chatbot/data/chat_provider.dart';
import 'package:myapp/features/wallet/data/wallet_provider.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => WalletProvider()),
        ChangeNotifierProvider(create: (context) => ChatProvider()),
      ],
      child: MaterialApp.router(
        title: 'Waste Wise',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        routerConfig: AppRouter.router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
