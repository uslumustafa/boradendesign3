"""Inspect generated HTML and HTTP behavior, rather than source-code intentions."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re,unittest,urllib.request,urllib.error,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]/'_site'
MANIFEST=json.loads((ROOT/'route-manifest.json').read_text())
class Document(HTMLParser):
    def __init__(self,text):
        super().__init__();self.nodes=[];self.ids=[];self.h1=0;self.ld=[];self.script=False;self.buffer='';self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);self.nodes.append((tag,a))
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        if tag=='script' and a.get('type')=='application/ld+json':self.script=True;self.buffer=''
    def handle_data(self,data):
        if self.script:self.buffer+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.script:self.ld.append(json.loads(self.buffer));self.script=False
    def find(self,tag,**attrs):return [a for t,a in self.nodes if t==tag and all(a.get(k)==v for k,v in attrs.items())]
DOCS={route:Document((ROOT/r['file']).read_text()) for route,r in MANIFEST['routes'].items()}
class StaticSEO(unittest.TestCase):
    def test_every_page_has_unique_search_metadata_and_one_h1(self):
        titles=[];descriptions=[]
        for route,record in MANIFEST['routes'].items():
            with self.subTest(route=route):
                doc=DOCS[route]
                self.assertEqual(doc.h1,1)
                self.assertEqual(len(doc.find('title')),1)
                self.assertEqual(len(doc.find('meta',name='description')),1)
                self.assertEqual(doc.find('link',rel='canonical')[0]['href'],record['canonical'])
                self.assertEqual(len(doc.ids),len(set(doc.ids)), 'Duplicate DOM ids')
                if record['indexable']:titles.append(record['title']);descriptions.append(record['description'])
        self.assertEqual(len(titles),len(set(titles)))
        self.assertEqual(len(descriptions),len(set(descriptions)))
    def test_local_links_images_scripts_and_anchors_resolve(self):
        for route,doc in DOCS.items():
            for tag,a in doc.nodes:
                for entry in a.get('srcset',a.get('imagesrcset','')).split(','):
                    if entry.strip():
                        image=entry.strip().split()[0]
                        with self.subTest(route=route,srcset=image):
                            self.assertTrue(image.startswith('/assets/'))
                            self.assertTrue((ROOT/image.lstrip('/')).is_file())
                for attr in ('href','src','poster','data-src'):
                    target=a.get(attr)
                    if not target or target.startswith(('http:','https:','mailto:','tel:','data:')):continue
                    with self.subTest(route=route,target=target):
                        u=urlsplit(target)
                        if not u.path:
                            if u.fragment:self.assertIn(unquote(u.fragment),doc.ids)
                            continue
                        self.assertTrue(u.path.startswith('/'), 'Relative public resource')
                        candidate=ROOT/u.path.lstrip('/')
                        self.assertTrue(u.path in MANIFEST['routes'] or candidate.is_file(), 'Missing local target')
                        if u.fragment and u.path in DOCS:self.assertIn(unquote(u.fragment),DOCS[u.path].ids)
    def test_schema_matches_real_page(self):
        for route,doc in DOCS.items():
            with self.subTest(route=route):
                self.assertEqual(len(doc.ld),1)
                graph=doc.ld[0]['@graph'];types=[n['@type'] for n in graph]
                self.assertIn('Organization',types);self.assertIn('WebPage',types)
                self.assertNotIn('AggregateRating',types)
                for node in graph:self.assertNotIn('aggregateRating',node)
                if route.startswith('/hizmetler/') and route!='/hizmetler/' and '/alan/' not in route:self.assertIn('Service',types)
                if route.startswith('/perspektifler/') and route!='/perspektifler/':
                    self.assertIn('Article',types)
                    article=next(n for n in graph if n['@type']=='Article')
                    self.assertEqual(article['author']['name'],'Boraden')
                    self.assertIn('citation',article)
    def test_sitemap_excludes_private_empty_and_historical_migration_pages(self):
        tree=ET.parse(ROOT/'sitemap.xml')
        urls=[n.text for n in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        expected=[r['canonical'] for r in MANIFEST['routes'].values() if r['indexable']]
        self.assertCountEqual(urls,expected)
        self.assertEqual(len(urls),len(set(urls)))
        for url in urls:self.assertNotRegex(url,r'admin|research|kurumsal-arsiv|preview|localhost|127\.0\.0\.1')
        self.assertIn('noindex',(ROOT/'admin.html').read_text())
    def test_turkish_perspectives_stay_on_site(self):
        home=DOCS['/'];links=[a.get('href','') for t,a in home.nodes if t=='a']
        for person in ('warren-buffett-deger-ve-fiyat','daniel-kahneman-karar-ve-belirsizlik','richard-thaler-insan-ve-sistem'):
            self.assertIn('/perspektifler/'+person+'/',links)
            content=(ROOT/'perspektifler'/person/'index.html').read_text()
            self.assertIn('KAYNAKTAN TÜRKÇEYE',content);self.assertIn('BORADEN YORUMU',content)
        self.assertNotIn('Kaynağı okuyun',(ROOT/'index.html').read_text())
    def test_service_media_is_not_repeated_in_a_page(self):
        for route,doc in DOCS.items():
            if not route.startswith('/hizmetler/') or '/alan/' in route:continue
            images=[a['src'] for t,a in doc.nodes if t=='img' and '/assets/services/' in a.get('src','')]
            with self.subTest(route=route):self.assertEqual(len(images),len(set(images)))
    def test_calculator_deep_links_and_initial_panels(self):
        for mode,name in [('income','gelir-vergisi'),('vat','kdv'),('salary','brut-net-maas')]:
            d=DOCS['/hesaplama/'+name+'/'];form=d.find('form',id='calculator-form')[0]
            self.assertEqual(form['data-initial-calculator'],mode)
            panels=[a for t,a in d.nodes if 'data-calc-panel' in a]
            self.assertEqual([a['data-calc-panel'] for a in panels if 'hidden' not in a],[mode])
    def test_http_routes_and_real_video_range(self):
        class NoRedirect(urllib.request.HTTPRedirectHandler):
            def redirect_request(self,*args):return None
        opener=urllib.request.build_opener(NoRedirect)
        redirects=[('/?service=ufrs-tfrs-raporlama','/hizmetler/ufrs-tfrs-raporlama/'),('/?page=hesaplama&calc=salary','/hesaplama/brut-net-maas/'),*MANIFEST['redirects'].items()]
        for old,new in redirects:
            self.assertIn(new,MANIFEST['routes'])
            with self.assertRaises(urllib.error.HTTPError) as caught:opener.open('http://127.0.0.1:4173'+old,timeout=5)
            self.assertEqual(caught.exception.code,301);self.assertEqual(caught.exception.headers['Location'],new);caught.exception.close()
        with self.assertRaises(urllib.error.HTTPError) as caught:urllib.request.urlopen('http://127.0.0.1:4173/nonexistent-seo-test/',timeout=5)
        self.assertEqual(caught.exception.code,404);caught.exception.close()
        req=urllib.request.Request('http://127.0.0.1:4173/assets/meeting-scroll-demo.mp4',headers={'Range':'bytes=0-127'})
        with urllib.request.urlopen(req,timeout=5) as response:
            self.assertEqual(response.status,206);self.assertEqual(len(response.read()),128)
            self.assertIn('noindex',response.headers['X-Robots-Tag'])
        with urllib.request.urlopen('http://127.0.0.1:4173/hizmetler/ufrs-tfrs-raporlama/',timeout=5) as response:
            html=response.read().decode();self.assertEqual(response.status,200);self.assertIn('VUK kayıtlarından dönüşümde',html)
        with urllib.request.urlopen('http://127.0.0.1:4173/robots.txt',timeout=5) as response:self.assertIn('Disallow: /',response.read().decode())

if __name__=='__main__':unittest.main(verbosity=2)
