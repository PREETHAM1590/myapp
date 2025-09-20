import 'package:flutter/material.dart';
import 'package:myapp/features/wallet/data/wallet_provider.dart';
import 'package:provider/provider.dart';

class WalletTestScreen extends StatelessWidget {
  const WalletTestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final walletProvider = Provider.of<WalletProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet Test'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (walletProvider.address != null)
              Text('Address: ${walletProvider.address}'),
            if (walletProvider.address != null)
              Text('Balance: ${walletProvider.balance} SOL'),
            ElevatedButton(
              onPressed: () => walletProvider.createWallet(),
              child: const Text('Create Wallet'),
            ),
            ElevatedButton(
              onPressed: () {
                // Replace with a valid address to test sending
                walletProvider.sendTransaction(
                    'REPLACE_WITH_A_VALID_SOLANA_ADDRESS', 0.1);
              },
              child: const Text('Send 0.1 SOL'),
            ),
          ],
        ),
      ),
    );
  }
}
