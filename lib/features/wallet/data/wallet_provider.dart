import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:solana/solana.dart';
import 'package:shared_preferences/shared_preferences.dart';

class WalletProvider with ChangeNotifier {
  String? _address;
  double _balance = 0.0;
  bool _isLoading = false;
  Ed25519HDKeyPair? _keyPair;

  String? get address => _address;
  double get balance => _balance;
  bool get isLoading => _isLoading;

  WalletProvider() {
    _loadWallet();
  }

  Future<void> _loadWallet() async {
    final prefs = await SharedPreferences.getInstance();
    final privateKey = prefs.getString('privateKey');
    if (privateKey != null) {
      _keyPair = await Ed25519HDKeyPair.fromPrivateKeyBytes(
          privateKey: List<int>.from(base64Decode(privateKey)));
      _address = _keyPair!.address;
      await _fetchBalance();
      notifyListeners();
    }
  }

  Future<void> createWallet() async {
    _setLoading(true);
    _keyPair = await Ed25519HDKeyPair.random();
    _address = _keyPair!.address;
    final privateKey = (await _keyPair!.extract()).bytes;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('privateKey', base64Encode(privateKey));
    await _fetchBalance();
    _setLoading(false);
  }

  Future<void> _fetchBalance() async {
    if (_address != null) {
      final client = RpcClient('https://api.devnet.solana.com');
      final balance = await client.getBalance(_address!);
      _balance = balance.value / lamportsPerSol;
      notifyListeners();
    }
  }

  Future<String?> sendTransaction(String toAddress, double amount) async {
    if (_keyPair == null) return null;
    _setLoading(true);
    try {
      final client = RpcClient('https://api.devnet.solana.com');
      final instruction = SystemInstruction.transfer(
        fromPublicKey: _keyPair!.publicKey,
        toPublicKey: Ed25519HDPublicKey.fromBase58(toAddress),
        lamports: (amount * lamportsPerSol).toInt(),
      );
      final message = Message(instructions: [instruction]);
      final recentBlockhash = await client.getLatestBlockhash();
      final signedTx = await signTransaction(
        recentBlockhash.value,
        message,
        [_keyPair!],
      );
      final signature = await client.sendTransaction(signedTx.encode());
      return signature;
    } catch (e) {
      print(e);
      return null;
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
}
