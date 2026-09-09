import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {render,routeList} from './render.mjs';
const root=path.dirname(fileURLToPath(import.meta.url)),out=path.join(root,'dist');
const D=JSON.parse(fs.readFileSync(path.join(root,'data/boraden.json'),'utf8'));
const L=JSON.parse(fs.readFileSync(path.join(root,'data/legacy.json'),'utf8'));
// The generated directory alone is replaced; preserved source stays untouched.
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'public'),out,{recursive:true});
const routes={};
for(const route of [...new Set(routeList(D)),'/404/']){const page=render(route,D,L),file=route==='/404/'?'404.html':route.slice(1)+'index.html';fs.mkdirSync(path.dirname(path.join(out,file)),{recursive:true});fs.writeFileSync(path.join(out,file),page.html);routes[route]={file,title:page.title,status:page.status};}
fs.writeFileSync(path.join(out,'route-manifest.json'),JSON.stringify(routes,null,2));
fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
console.log(JSON.stringify({pages:Object.keys(routes).length,services:D.services.length,documents:L.documents.length,output:out}));
