"""Read-only archive of public, linked Boraden pages and assets. No form submission."""
import concurrent.futures, hashlib, json, re, time
from collections import deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit, unquote, quote
from urllib.request import Request, urlopen
from urllib.error import HTTPError

ROOT = Path(__file__).resolve().parent / 'legacy'
ROOT.mkdir(exist_ok=True)
for d in ['html', 'text', 'assets']:
    (ROOT/d).mkdir(exist_ok=True)
ORIGIN = 'https://boraden.com.tr/'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links=[]; self.assets=[]; self.text=[]; self.skip=0; self.title=''; self.in_title=False; self.in_link=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ['script','style','noscript']: self.skip+=1
        if tag=='title': self.in_title=True
        if tag=='a' and a.get('href'): self.links.append({'href':a['href'],'label':''}); self.in_link=True
        if tag in ['img','source'] and a.get('src'): self.assets.append(a['src'])
        if tag=='link' and a.get('rel')=='stylesheet' and a.get('href'): self.assets.append(a['href'])
        if tag in ['h1','h2','h3','h4','p','li','tr','br','div']:self.text.append('\n')
    def handle_endtag(self,tag):
        if tag in ['script','style','noscript']:self.skip=max(0,self.skip-1)
        if tag=='title':self.in_title=False
        if tag=='a':self.in_link=False
        if tag in ['h1','h2','h3','h4','p','li','tr','div']:self.text.append('\n')
    def handle_data(self,data):
        if self.in_title:self.title+=data
        if not self.skip:
            self.text.append(data)
            if self.links and self.in_link:self.links[-1]['label']+=' '+data.strip()

def normalize(raw,base):
    u=urlsplit(urljoin(base,raw.strip()))
    if u.scheme not in ['http','https'] or u.hostname not in ['boraden.com.tr','www.boraden.com.tr']:return None
    if any(x in u.path.lower() for x in ['/admin','/login','/logout']):return None
    # Legacy pages use root-relative links without a slash on nested routes.
    # Collapse only observed repeated content/media prefixes; do not crawl an infinite alias tree.
    parts=u.path.strip('/').split('/')
    for prefix in ['haber','blog','upload','dokuman','css','plugins']:
        positions=[i for i,p in enumerate(parts) if p.lower()==prefix]
        if positions: parts=parts[positions[-1]:]; break
    if len(parts)>1 and parts[0].lower() in ['haber','blog'] and parts[-1] in root_slugs:
        parts=[parts[-1]]
    if len(parts)>3:return None
    u=u._replace(path='/'+ '/'.join(parts))
    return urlunsplit(('https','boraden.com.tr',quote(unquote(u.path or '/'),safe='/:@!$&\'()*+,;=-._~'),u.query,''))
def fetch(url):
    key=hashlib.sha256(url.encode()).hexdigest()[:18]
    try:
        ext=Path(unquote(urlsplit(url).path)).suffix.lower()
        cached=ROOT/'html'/(key+'.html')
        if cached.exists():
            ct='text/html';data=cached.read_bytes();final=url
        else:
            req=Request(url,headers={'User-Agent':'Boraden-reference-review/1.0','Accept':'text/html,application/pdf,*/*'})
            with urlopen(req,timeout=25) as res:
                ct=res.headers.get_content_type(); data=res.read(30_000_001); final=res.url
                if len(data)>30_000_000:return {'url':url,'status':'size_limit','type':ct},[],[]
        html=ct=='text/html'
        out=ROOT/('html' if html else 'assets')/(key+('.html' if html else ext or '.bin'))
        out.write_bytes(data)
        row={'url':url,'final':final,'status':200,'type':ct,'bytes':len(data),'path':str(out.relative_to(ROOT)),'sha256':hashlib.sha256(data).hexdigest()}
        links=[]; assets=[]
        if html:
            text=data.decode('utf-8',errors='replace'); parser=Page();parser.feed(text)
            plain=re.sub(r'\n[ \t]*\n+','\n', ''.join(parser.text))
            (ROOT/'text'/(key+'.txt')).write_text(plain)
            row.update(title=parser.title.strip(),text_path='text/'+key+'.txt',links=parser.links)
            links=[normalize(x['href'],url) for x in parser.links];assets=[normalize(x,url) for x in parser.assets]
        elif ct=='text/css' or ext=='.css':
            assets=[normalize(x,url) for x in re.findall(r'url\([\s\"\']*([^\)\"\']+)',data.decode('utf-8',errors='replace'))]
        return row,[x for x in links if x],[x for x in assets if x]
    except HTTPError as e:return {'url':url,'status':e.code},[],[]
    except Exception as e:return {'url':url,'status':'error','error':type(e).__name__},[],[]

root_slugs=set()
seed_path=ROOT/'html'/(hashlib.sha256((ORIGIN+'index.html').encode()).hexdigest()[:18]+'.html')
if seed_path.exists():
    parser=Page();parser.feed(seed_path.read_text())
    root_slugs={urlsplit(x['href']).path.strip('/') for x in parser.links if '/' not in urlsplit(x['href']).path.strip('/')}
todo=deque([ORIGIN+'index.html']);seen=set();manifest=[];asset_queue=set()
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    while todo:
        batch=[]
        while todo and len(batch)<4:
            u=todo.popleft()
            if u in seen:continue
            seen.add(u);batch.append(u)
        for row,links,assets in pool.map(fetch,batch):
            manifest.append(row)
            with (ROOT/'checkpoint.jsonl').open('a') as log:log.write(json.dumps(row,ensure_ascii=False)+'\n')
            for u in links:
                ext=Path(urlsplit(u).path).suffix.lower()
                if ext in ['.pdf','.xlsx','.xls','.doc','.docx','.jpg','.jpeg','.png','.gif','.webp','.zip']:asset_queue.add(u)
                elif ext in ['', '.html','.htm','.php'] and u not in seen:todo.append(u)
            asset_queue.update(assets)
        if len(manifest)%20<4:print('HTML records',len(manifest),'queued',len(todo),flush=True)
        if len(seen)>1200:
            print('Discovery guard reached; queued URLs recorded.',flush=True);break
    targets=sorted(asset_queue-seen)
    for i,(row,links,assets) in enumerate(pool.map(fetch,targets)):
        manifest.append(row)
        if i%40==0:print('Asset records',i+1,'/',len(targets),flush=True)

result={'origin':ORIGIN,'captured_at':datetime.now(timezone.utc).isoformat(),'queued_not_fetched':list(todo),'records':manifest}
(ROOT/'manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
stats={'html':sum(r.get('type')=='text/html' and r['status']==200 for r in manifest),'assets':sum(r.get('type')!='text/html' and r['status']==200 for r in manifest),'failures':sum(r['status']!=200 for r in manifest),'bytes':sum(r.get('bytes',0) for r in manifest),'pending':len(todo)}
(ROOT/'summary.json').write_text(json.dumps(stats,indent=2));print(json.dumps(stats),flush=True)
