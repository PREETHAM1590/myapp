import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class WasteScanningScreen extends StatefulWidget {
  const WasteScanningScreen({super.key});

  @override
  State<WasteScanningScreen> createState() => _WasteScanningScreenState();
}

class _WasteScanningScreenState extends State<WasteScanningScreen> {
  CameraController? _controller;
  List<CameraDescription>? _cameras;
  XFile? _imageFile;
  String? _classification;

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  Future<void> _initializeCamera() async {
    _cameras = await availableCameras();
    if (_cameras != null && _cameras!.isNotEmpty) {
      _controller = CameraController(
        _cameras!.first,
        ResolutionPreset.medium,
      );
      await _controller!.initialize();
      if (!mounted) {
        return;
      }
      setState(() {});
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  Future<void> _takePicture() async {
    if (_controller == null || !_controller!.value.isInitialized) {
      return;
    }
    final image = await _controller!.takePicture();
    setState(() {
      _imageFile = image;
      _classification = 'Plastic Bottle'; // Placeholder
    });
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final image = await picker.pickImage(source: ImageSource.gallery);
    setState(() {
      _imageFile = image;
      _classification = 'Glass Bottle'; // Placeholder
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan Waste Item'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            if (_imageFile != null)
              Image.file(File(_imageFile!.path))
            else if (_controller != null && _controller!.value.isInitialized)
              CameraPreview(_controller!)
            else
              const Center(child: CircularProgressIndicator()),
            const SizedBox(height: 16),
            if (_classification != null) ...[
              Text('Classification: $_classification',
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold)),
              const SizedBox(height: 16),
              // Add recycling tips here
            ],
            ElevatedButton.icon(
              onPressed: _takePicture,
              icon: const Icon(Icons.camera_alt),
              label: const Text('Capture & Classify'),
            ),
            const SizedBox(height: 16),
            OutlinedButton.icon(
              onPressed: _pickImage,
              icon: const Icon(Icons.image),
              label: const Text('Pick from Gallery'),
            ),
          ],
        ),
      ),
    );
  }
}
