import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),dist=path.join(root,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf','.woff2':'font/woff2','.pdf':'application/pdf','.mp4':'video/mp4','.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'};
const server=http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
 const resolved=path.resolve(dist,'.'+pathname);if(!resolved.startsWith(dist+path.sep)&&resolved!==dist){res.writeHead(403);return res.end();}
 let file=resolved,status=200;try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.statSync(file).isFile())throw new Error();}catch{file=path.join(dist,'404.html');status=404;}
 const stat=fs.statSync(file);res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':stat.size,'X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'"});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);
});server.listen(process.env.PORT || 4175,'127.0.0.1',()=>console.log('Boraden design3: http://127.0.0.1:4175'));
