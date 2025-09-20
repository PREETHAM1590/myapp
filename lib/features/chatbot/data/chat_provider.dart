import 'package:flutter/foundation.dart';
import 'package:firebase_ai/firebase_ai.dart';

class ChatProvider with ChangeNotifier {
  final GenerativeModel _model =
      FirebaseVertexAI.instance.generativeModel(model: 'gemini-pro');
  final List<Message> _messages = [];
  bool _isLoading = false;

  List<Message> get messages => _messages;
  bool get isLoading => _isLoading;

  Future<void> sendMessage(String text) async {
    _setLoading(true);
    _messages.add(Message(text: text, isUser: true));
    notifyListeners();

    try {
      final response = await _model.generateContent([Content.text(text)]);
      _messages.add(Message(text: response.text ?? '', isUser: false));
    } catch (e) {
      _messages.add(Message(text: 'Error: ${e.toString()}', isUser: false));
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
}

class Message {
  final String text;
  final bool isUser;

  Message({required this.text, required this.isUser});
}
