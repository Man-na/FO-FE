import 'package:flutter/material.dart';
import 'package:bluewhale_link/link/component/youtube_player_screen.dart';
import 'package:url_launcher/url_launcher.dart';

class LinkScreen extends StatelessWidget {
  const LinkScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "청경학원 홈페이지",
          imagePath: 'asset/img/link/bluewhalelink.png',
          url: 'https://www.bluewhalelink.com/',
        ),
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "청경학원 블로그",
          imagePath: 'asset/img/link/blog.png',
          url: 'https://blog.naver.com/bluewhalelink',
        ),
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "청경 인스타그램",
          imagePath: 'asset/img/link/instagram.jpeg',
          url: 'https://www.instagram.com/bluewhalelink',
        ),
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "이투스",
          imagePath: 'asset/img/link/etoos.png',
          url: 'https://www.etoos.com/home/default.asp',
        ),
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "(문의) 청경학원",
          imagePath: 'asset/img/link/helper.png',
          url: 'https://pf.kakao.com/_SVxdaxb',
        ),
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "(문의) 청경 Consulting",
          imagePath: 'asset/img/link/consulting.png',
          url: 'https://pf.kakao.com/_xiCDxdG',
        ),
        const SizedBox(height: 8.0),
        _buildYoutubeThumbnail(context),
        const SizedBox(height: 8.0),
        const LinkItem(
          title: "전화 문의 041.545.4229\n아산시 번영로234번길 2 메디포스 9층",
          isMultiLine: true,
        ),
      ],
    );
  }

  Widget _buildYoutubeThumbnail(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(
            builder: (_) => const YoutubePlayerScreen(videoId: '48pasnobnn4')),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Container(
          height: MediaQuery.of(context).size.width > 600 ? 400.0 : 200.0,
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10.0),
            image: const DecorationImage(
              image:
                  NetworkImage('https://img.youtube.com/vi/48pasnobnn4/0.jpg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }
}

class LinkItem extends StatelessWidget {
  final String title;
  final bool isMultiLine;
  final String? imagePath;
  final String? url; // URL 추가

  const LinkItem({
    required this.title,
    this.isMultiLine = false,
    this.imagePath,
    this.url,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => _launchURL(url),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: Container(
          height: 80.0,
          width: MediaQuery.of(context).size.width,
          alignment: isMultiLine ? Alignment.center : Alignment.centerLeft,
          decoration: BoxDecoration(
            border: isMultiLine
                ? null
                : Border.all(color: Colors.black, width: 1.0),
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Row(
            children: [
              if (!isMultiLine && imagePath != null)
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    width: 50.0,
                    height: 50.0,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),
                      image: DecorationImage(
                        image: _getImageProvider(imagePath!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              Expanded(
                child: Text(
                  title,
                  textAlign: isMultiLine ? TextAlign.center : TextAlign.left,
                  style: const TextStyle(fontSize: 16.0, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _launchURL(String? urlString) async {
    if (urlString != null && await canLaunch(urlString)) {
      await launch(urlString);
    } else {
      throw 'Could not launch $urlString';
    }
  }

  ImageProvider _getImageProvider(String path) {
    if (path.startsWith('http')) {
      return NetworkImage(path);
    } else {
      return AssetImage(path);
    }
  }
}
