import test from 'node:test';
import assert from 'node:assert/strict';
import {serviceContact} from './service-contact.mjs';

const input={group:'denetim',title:'UFRS/TFRS Raporlama',serviceId:'ufrs-tfrs-raporlama'};
// Fixture data is supplied in memory; the production contact directory stays empty.
const fixture=person=>({groups:{denetim:person},services:{}});

test('unassigned service contacts show an honest CTA without a person or broken image',()=>{
 const html=serviceContact(input,{groups:{},services:{}});
 assert.ok(html.includes('Bu alanda nasıl yardımcı olabiliriz?'));
 assert.ok(html.includes(input.title));assert.ok(html.includes('href="/iletisim/"'));
 assert.ok(!/<img|<h3|mailto:|service-contact-role/.test(html));
});
test('a service override inherits group details and can explicitly clear its photo',()=>{
 const directory=fixture({name:'Test Sorumlusu',role:'Test Unvanı',email:'test+service@example.com',photo:'/assets/enterprise-landscape.jpg'});
 let html=serviceContact(input,directory);
 assert.ok(html.includes('<h3>Test Sorumlusu</h3>'));assert.ok(html.includes('Test Unvanı'));
 assert.ok(html.includes('src="/assets/enterprise-landscape.jpg"'));
 assert.ok(html.includes('href="mailto:test%2Bservice@example.com"'));
 directory.services[input.serviceId]={name:'Servis Test Sorumlusu',photo:''};
 html=serviceContact(input,directory);assert.ok(html.includes('<h3>Servis Test Sorumlusu</h3>'));assert.ok(html.includes('Test Unvanı'));assert.ok(!html.includes('<img'));
});
test('unsafe or missing assets and email headers are hidden, while copy is escaped',()=>{
 for(const photo of ['https://example.com/photo.jpg','//example.com/photo.jpg','/assets/../data/photo.jpg','/assets/%2e%2e/photo.jpg','/assets/person.jpg" onerror="alert(1)','/assets/missing-service-owner.jpg']){
  const html=serviceContact(input,fixture({name:'Test Sorumlusu',photo}));assert.ok(!html.includes('<img'),photo);
 }
 for(const email of ['javascript:alert(1)','test@example.com?bcc=other@example.com','test@example.com\r\nBcc:other@example.com','test@example..com','test..person@example.com','test.@example.com','" onclick="alert(1)']){
  const html=serviceContact(input,fixture({name:'Test Sorumlusu',email}));assert.ok(!html.includes('mailto:'),email);assert.ok(html.includes('href="/iletisim/"'));
 }
 const html=serviceContact({...input,title:'<img src=x onerror=alert(1)>',serviceId:'x" onclick="bad'},fixture({name:'<Test & Sorumlu>',role:'"Test" <Rol>'}));
 assert.ok(html.includes('&lt;Test &amp; Sorumlu&gt;'));assert.ok(html.includes('&quot;Test&quot; &lt;Rol&gt;'));assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));assert.ok(!/<img|\sonclick="/.test(html));
});
