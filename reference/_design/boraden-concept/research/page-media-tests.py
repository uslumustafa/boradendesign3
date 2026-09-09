"""Check shipped page media, including accidental duplicate copies under new names."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import hashlib, json, unittest

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / '_site'
ROUTES = json.loads((SITE / 'route-manifest.json').read_text())['routes']

class MediaDocument(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.nodes=[]; self.feed(text)
    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag,dict(attrs)))

class PageMediaTests(unittest.TestCase):
    def test_every_public_route_has_a_distinct_visible_primary_image(self):
        hashes=[]
        for route, record in ROUTES.items():
            with self.subTest(route=route):
                doc=MediaDocument((SITE/record['file']).read_text())
                primary=next(a['content'] for t,a in doc.nodes if t=='meta' and a.get('property')=='og:image')
                path=urlsplit(primary).path
                image=SITE/path.lstrip('/')
                self.assertTrue(image.is_file())
                self.assertTrue(any(t=='img' and a.get('src')==path for t,a in doc.nodes),'Primary image must appear in the actual page')
                hashes.append(hashlib.sha256(image.read_bytes()).hexdigest())
        self.assertEqual(len(hashes),len(set(hashes)), 'Different filenames must not hide duplicated primary images')

    def test_selected_new_images_are_present_and_responsively_encoded(self):
        register=json.loads((ROOT/'research/page-media-generated.json').read_text())['generated']
        variants=json.loads((ROOT/'research/image-variants.json').read_text())
        self.assertEqual(len(register),25)
        for item in register:
            with self.subTest(image=item['id']):
                image=ROOT/item['path']
                self.assertEqual(hashlib.sha256(image.read_bytes()).hexdigest(),item['sha256'])
                self.assertEqual(variants[item['path']]['sha256'],item['sha256'])
                for variant in variants[item['path']]['variants']:
                    self.assertTrue((SITE/variant['src']).is_file())

    def test_about_uses_a_separate_second_scene_and_video_is_not_reused(self):
        about=(SITE/'hakkimizda/index.html').read_text()
        self.assertIn('/assets/pages/hakkimizda-sahne.jpg',about)
        video_routes=[]
        for route,record in ROUTES.items():
            doc=MediaDocument((SITE/record['file']).read_text())
            if any(t=='video' for t,a in doc.nodes):video_routes.append(route)
        self.assertEqual(video_routes,['/','/hakkimizda/'])
        home=(SITE/'index.html').read_text()
        self.assertIn('/assets/sector-entry-office.mp4',home)
        self.assertNotIn('sector-entry-office.mp4',about)
        self.assertNotIn('meeting-scroll-demo.mp4',home)
        self.assertTrue((SITE/'assets/sector-entry-office.mp4').is_file())

if __name__=='__main__': unittest.main(verbosity=2)
