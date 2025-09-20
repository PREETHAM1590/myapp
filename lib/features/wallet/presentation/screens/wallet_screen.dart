import 'package:flutter/material.dart';
import 'package:myapp/features/wallet/data/wallet_provider.dart';
import 'package:provider/provider.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final walletProvider = Provider.of<WalletProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Web3 Wallet'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (walletProvider.address == null)
              const WalletConnection()
            else
              Column(
                children: [
                  BalanceCard(
                    token: 'SOL',
                    balance: walletProvider.balance.toStringAsFixed(4),
                    icon: Icons.sync_alt, // Placeholder for SOL icon
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () {
                            // Implement send logic
                          },
                          icon: const Icon(Icons.arrow_upward),
                          label: const Text('Send'),
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size(double.infinity, 50),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            // Implement receive logic
                          },
                          icon: const Icon(Icons.qr_code),
                          label: const Text('Receive'),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size(double.infinity, 50),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Recent Transactions',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  // Transaction list will be implemented later
                ],
              )
          ],
        ),
      ),
    );
  }
}

class WalletConnection extends StatelessWidget {
  const WalletConnection({super.key});

  @override
  Widget build(BuildContext context) {
    final walletProvider = Provider.of<WalletProvider>(context, listen: false);

    return Column(
      children: [
        ElevatedButton(
          onPressed: () => walletProvider.createWallet(),
          child: const Text('Create a new wallet'),
        ),
      ],
    );
  }
}

class BalanceCard extends StatelessWidget {
  final String token;
  final String balance;
  final IconData icon;

  const BalanceCard({
    super.key,
    required this.token,
    required this.balance,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Icon(icon, size: 40),
            const SizedBox(width: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('$token Balance',
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(balance,
                    style: const TextStyle(
                        fontSize: 24, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
