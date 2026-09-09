"""Local static preview: full HTML routes, redirects, real 404s and byte-range video."""
import functools, json, os, re, shutil
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, parse_qsl, urlencode, unquote
ROOT = Path(__file__).resolve().parent / '_site'
ROUTE_KEYS = {'page', 'service', 'sector', 'article', 'kind', 'perspective', 'category', 'calc'}

class Preview(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('X-Robots-Tag', 'noindex, nofollow')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def redirect(self, target):
        self.send_response(301)
        self.send_header('Location', target)
        self.send_header('Content-Length', '0')
        self.end_headers()
        return None

    def send_head(self):
        self.byte_range = None
        url = urlsplit(self.path)
        pathname = unquote(url.path)
        if pathname == '/robots.txt':
            from io import BytesIO
            data = b'User-agent: *\nDisallow: /\n'
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            return BytesIO(data)
        try:
            manifest = json.loads((ROOT / 'route-manifest.json').read_text())
        except (OSError, ValueError):
            self.send_error(503, 'Run node _design/boraden-concept/build.mjs first')
            return None
        pairs = parse_qsl(url.query, keep_blank_values=True)
        route_query = urlencode(sorted((k,v) for k,v in pairs if k in ROUTE_KEYS))
        extras = [(k,v) for k,v in pairs if k not in ROUTE_KEYS]
        target = None
        invalid_query = False
        if pathname in ('/', '/index.html') and route_query:
            target = manifest['queries'].get(route_query)
            invalid_query = target is None
        elif pathname in manifest['redirects']:
            target = manifest['redirects'][pathname]
        elif not pathname.endswith('/') and pathname+'/' in manifest['routes']:
            target = pathname+'/'
        if target:
            return self.redirect(target + ('?'+urlencode(extras) if extras else ''))
        record = manifest['routes'].get(pathname)
        code = 200
        if record and not invalid_query:
            file = ROOT / record['file']
            code = record['status']
        else:
            file = (ROOT / pathname.lstrip('/')).resolve()
            if not file.is_relative_to(ROOT):
                self.send_error(403)
                return None
            if invalid_query or not file.is_file():
                file = ROOT / 'dynamic.html'
                code = 404
        try:
            source = file.open('rb')
        except OSError:
            self.send_error(404)
            return None
        size = os.fstat(source.fileno()).st_size
        start, end = 0, size-1
        raw = self.headers.get('Range')
        if raw and code == 200:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', raw.strip())
            if not match or not any(match.groups()):
                source.close(); self.send_error(416); return None
            a,b = match.groups()
            if a:
                start=int(a); end=min(int(b),size-1) if b else size-1
            else:
                start=max(0,size-int(b))
            if start>end or start>=size:
                source.close(); self.send_response(416)
                self.send_header('Content-Range',f'bytes */{size}')
                self.send_header('Content-Length','0'); self.end_headers(); return None
            self.byte_range=(start,end)
            code=206
        self.send_response(code)
        if self.byte_range:
            self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
        self.send_header('Content-Type',self.guess_type(str(file)))
        self.send_header('Accept-Ranges','bytes')
        self.send_header('Content-Length',str(end-start+1))
        self.send_header('Cache-Control','no-cache')
        self.end_headers()
        return source

    def copyfile(self, source, outputfile):
        try:
            if self.byte_range:
                start,end=self.byte_range;source.seek(start);remaining=end-start+1
                while remaining>0:
                    data=source.read(min(65536,remaining))
                    if not data:break
                    outputfile.write(data);remaining-=len(data)
            else:
                shutil.copyfileobj(source,outputfile)
        except (BrokenPipeError,ConnectionResetError):
            pass

if __name__ == '__main__':
    print('Boraden static preview: http://127.0.0.1:4173 (preview noindex, video byte ranges)',flush=True)
    ThreadingHTTPServer(('127.0.0.1',4173),functools.partial(Preview,directory=str(ROOT))).serve_forever()
