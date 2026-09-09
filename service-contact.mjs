import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const contacts=JSON.parse(fs.readFileSync(new URL('./data/service-contacts.json',import.meta.url),'utf8'));
const publicRoot=fileURLToPath(new URL('./public/',import.meta.url));
const assetRoot=fs.realpathSync(path.join(publicRoot,'assets'));
const text=value=>typeof value==='string'?value.trim():'';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const own=(records,key)=>records&&Object.hasOwn(records,key)?records[key]:{};
const arrow='<span aria-hidden="true">↗</span>';
const contactLink=()=>`<a class="service-contact-link" href="/iletisim/">Birlikte konuşalım ${arrow}</a>`;

function safeEmail(value){
 const email=text(value);
 if(email.length>254||!/^[a-z0-9][a-z0-9._+-]*@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email))return '';
 const local=email.split('@')[0];if(local.length>64||local.endsWith('.')||local.includes('..'))return '';
 return email.split('@')[1].split('.').every(label=>/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label))?email:'';
}
function safePhoto(value){
 const photo=text(value);
 if(!/^\/assets\/[a-z0-9_./-]+\.(?:avif|webp|png|jpe?g)$/i.test(photo)||photo.includes('//')||photo.split('/').some(part=>part==='.'||part==='..'))return '';
 try{
  const file=fs.realpathSync(path.join(publicRoot,photo.slice(1)));
  return file.startsWith(assetRoot+path.sep)&&fs.statSync(file).isFile()?photo:'';
 }catch{return '';}
}

// Group defaults apply first; a service can replace or explicitly clear any field.
export function serviceContact({group='',title='',serviceId=''}={},directory=contacts){
 const person={...own(directory.groups,group),...own(directory.services,serviceId)};
 const name=text(person.name),role=text(person.role),email=safeEmail(person.email),photo=safePhoto(person.photo);
 const id='service-contact-'+(text(serviceId)||text(group)||'service').replace(/[^a-z0-9_-]/gi,'-');
 const subject=text(title);
 return `<section class="service-contact" aria-labelledby="${id}"><div class="service-contact-inner wrap">
 <div class="service-contact-copy"><p class="service-contact-eyebrow">HİZMET İLETİŞİMİ</p><h2 id="${id}">Bu alanda nasıl yardımcı olabiliriz?</h2>${subject?`<p class="service-contact-subject">${esc(subject)}</p>`:''}</div>
 ${name?`<div class="service-contact-person">${photo?`<img class="service-contact-photo" src="${esc(photo)}" alt="" width="88" height="108" loading="lazy">`:''}<div class="service-contact-profile"><h3>${esc(name)}</h3>${role?`<p class="service-contact-role">${esc(role)}</p>`:''}${email?`<a class="service-contact-email" href="mailto:${esc(encodeURIComponent(email).replace('%40','@'))}">${esc(email)} ${arrow}</a>`:contactLink()}</div></div>`:`<div class="service-contact-actions">${contactLink()}</div>`}
 </div></section>`;
}
