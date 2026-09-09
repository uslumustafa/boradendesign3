"""Extract the captured public archive; never execute embedded scripts or spreadsheets."""
import json,re,hashlib,shutil,collections,logging
from datetime import date
logging.getLogger("pypdf").setLevel(logging.ERROR)
from pathlib import Path
from urllib.parse import urlsplit,unquote,urljoin
from lxml import html
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parent.parent
BASE=ROOT/'research/legacy'
manifest=json.loads((BASE/'manifest.json').read_text())
pages={};docs=[];seen=set();aliases=[];failures=[];labels={}
for r in manifest['records']:
    if r.get('type')!='text/html':continue
    tree=html.fromstring((BASE/r['path']).read_bytes())
    for tr in tree.xpath('//tr[.//a[contains(@href,".pdf")]]'):
        a=tr.xpath('.//a[contains(@href,".pdf")]')[0];label=' '.join(a.text_content().split())
        number=re.search(r'No:\s*(20\d{2}[_/ -]\d+)',tr.text_content())
        if label:labels[urljoin(r['url'],a.get('href'))]={'title':label,'number':number[1].replace('_','/') if number else ''}

for row in manifest['records']:
    if row['status']!=200:failures.append({'url':row['url'],'status':row['status']});continue
    path=BASE/row['path'];slug=urlsplit(row['url']).path.strip('/')
    if row['type']=='text/html':
        tree=html.fromstring(path.read_bytes())
        elements=tree.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," gdlr-core-text-box-item-content ")]')
        text=[]
        for el in elements:
            for br in el.xpath('.//br'):br.tail='\n'+(br.tail or '')
            for p in el.xpath('.//p|.//li'):p.tail='\n'+(p.tail or '')
            text.extend(re.sub(r'[ \t]+',' ',s).strip() for s in el.text_content().split('\n') if len(s.strip())>3)
        text=list(dict.fromkeys(text))
        if len(slug.split('/'))<=2:
            pages[slug]={'url':row['url'],'title':row.get('title',''),'paragraphs':text,'archive':row['text_path']}
    elif row['type']=='application/pdf':
        if row['sha256'] in seen:aliases.append(row['url']);continue
        seen.add(row['sha256'])
        try:
            content=PdfReader(path).pages[0].extract_text() or ''
            # Dates are taken only from explicitly labelled dates in the PDF, not the website listing.
            m=re.search(r'(?:Sirk[üu]ler\s*Tarihi|(?<!Gazete )Tarih(?:\s*&\s*Say[ıi])?)\s*[:：]?\s*(\d{1,2})[./-](\d{1,2})[./-](20\d{2})',content,re.I)
            doc_date=f'{m[3]}-{int(m[2]):02}-{int(m[1]):02}' if m else None
            if doc_date:
                try:date.fromisoformat(doc_date)
                except ValueError:doc_date=None
            num=re.search(r'(?:Sirk[üu]ler\s*(?:No|Numaras[ıi])|Say[ıi])\s*[:：]?\s*([0-9/ -]{3,20})',content,re.I)
            title=re.search(r'Konu\s*[:：]?\s*(.*?)(?:\n\s*\n|Say[ıi]n|Sirk[üu]ler|http|www\.)',content,re.I|re.S)
            title=re.sub(r'\s+',' ',title[1]).strip()[:240] if title else ''
            year=(doc_date or (re.search(r'20(?:19|20|21|22)',content) or [''])[0])[:4]
            title=unquote(Path(slug).stem).replace('_',' ').replace('-',' ')
            title=re.sub(r'^20\d{2}\s*\d{2,3}\s*','',title).strip()
            if num is None:
                num=re.search(r'Tarih\s*&\s*Say[ıi]\s*:\s*\d{1,2}[/.-]\d{1,2}[/.-](20\d{2}[-/]\d+)',content,re.I)
            if len(title)<6:title='Boraden arşiv belgesi'
            label=labels.get(row['url'],{})
            if label.get('title'):title=label['title']
            file_year=re.search(r'20(?:19|20|21|22)',Path(slug).stem)
            if not doc_date:year=(label.get('number','')[:4] or (file_year[0] if file_year else ''))
            pdf_num=re.search(r'Tarih\s*&\s*Say[ıi]\s*:\s*\d{1,2}[/.-]\d{1,2}[/.-](20\d{2})[_/-](\d+)',content,re.I)
            number=(pdf_num[1]+'/'+pdf_num[2]) if pdf_num else label.get('number','')
            docs.append({'id':row['sha256'][:16],'title':title,'date':doc_date,'year':year,'number':number, 'file':'research/legacy/'+row['path'],'source':row['url'],'bytes':row['bytes']})
        except Exception as e:failures.append({'url':row['url'],'status':'PDF extraction '+type(e).__name__})
    elif row['type']=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        target=ROOT/'assets/documents/7326-Hesaplama-2021.xlsx';target.parent.mkdir(exist_ok=True);shutil.copyfile(path,target)
root_pages={k:v for k,v in pages.items() if '/' not in k};pages={k:v for k,v in pages.items() if '/' not in k or k.split('/')[-1] not in root_pages}
docs.sort(key=lambda x:(x['year'],x['date'] or '',x['number']),reverse=True)
data={'pages':pages,'documents':docs,'captured':manifest['captured_at'][:10]}
(ROOT/'legacy-data.js').write_text('window.BORADEN_LEGACY='+json.dumps(data,ensure_ascii=False)+';\n')
(BASE/'extracted.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
stats={'fetched_html_records':sum(r.get('type')=='text/html' for r in manifest['records']),'extracted_pages':len(pages),'nonempty_pages':sum(bool(p['paragraphs']) for p in pages.values()),'unique_documents':len(docs),'dated_documents':sum(bool(x['date']) for x in docs),'duplicate_documents':len(aliases),'failed_requests':len(failures)}
(BASE/'inventory.json').write_text(json.dumps({'stats':stats,'failures':failures,'duplicate_documents':aliases},ensure_ascii=False,indent=2))
print(json.dumps(stats))
