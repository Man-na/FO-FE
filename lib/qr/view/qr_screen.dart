import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
// import 'package:http/http.dart' as http;

class QRScanScreen extends StatefulWidget {
  @override
  _QRScanScreenState createState() => _QRScanScreenState();
}

class _QRScanScreenState extends State<QRScanScreen> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      controller.pauseCamera();
      _sendDataToServer(scanData.code);
    });
  }

  void _sendDataToServer(String? qrData) async {
    print(qrData);

  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(title: const Text('QR 스캔')),
        body: Column(
          children: <Widget>[
            Expanded(
              flex: 5,
              child: QRView(
                key: qrKey,
                onQRViewCreated: _onQRViewCreated,
              ),
            ),
            const Expanded(
              flex: 1,
              child: Center(
                child: Text('QR 코드를 스캔하세요'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
