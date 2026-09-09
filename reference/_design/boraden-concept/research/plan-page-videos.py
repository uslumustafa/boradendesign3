"""Prepare production briefs only. This script does not generate or fetch video."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json

ROOT=Path(__file__).resolve().parents[1]
routes=json.loads((ROOT/'_site/route-manifest.json').read_text())['routes']
image_plans=json.loads((ROOT/'research/media-plan.json').read_text())+json.loads((ROOT/'research/page-media-plan.json').read_text())
by_image={p['path']:p for p in image_plans}
special={
 '/':'Wide dusk decision-room shot. Three experienced advisors study financial analysis on the right; dark negative space remains left. Slow controlled lateral camera reveal, one natural paper-turn action. No posed handshake.',
 '/hakkimizda/':'Overhead-oblique working table. Different colleagues connect evidence, annotate working papers and listen to one another. A slow descending camera arc reveals their collaboration. Keep the separate generated About second-scene composition for a later insert.',
 '/sektorler/':'Quiet early-morning aerial glide over an anonymous manufacturing and logistics campus. Subtle vehicle motion and a coherent flow of activity. Do not imply that Boraden owns the facilities.',
 '/perspektifler/warren-buffett-deger-ve-fiyat/':'A precision manufactured component and company assessment papers, with focus shifting from a price note to evidence of business quality. No animation or impersonation of Warren Buffett; preserve his licensed still portrait separately.',
 '/perspektifler/daniel-kahneman-karar-ve-belirsizlik/':'An analyst pauses before choosing between two uncertain scenarios on a paper decision map. A light reflection changes what is prominent. No animation or impersonation of Daniel Kahneman; preserve his licensed still portrait separately.',
 '/perspektifler/richard-thaler-insan-ve-sistem/':'Close observation of an anonymous person selecting between clearly arranged process options, followed by a small change in the order of those options. No animation or impersonation of Richard Thaler; preserve his licensed still portrait separately.'
}
class Metadata(HTMLParser):
 def __init__(self):
  super().__init__();self.stack=[];self.sections=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta' and a.get('property')=='og:image':self.image=urlsplit(a['content']).path.lstrip('/')
  if tag=='img':
   ancestors={c for _,classes in self.stack for c in classes}
   slot='scope' if 'scope-visual' in ancestors else 'story-shot' if 'media-story-shot' in ancestors else 'about-scene' if 'scene-poster' in a.get('class','').split() else None
   if slot:self.sections.append({'slot':slot,'still':a['src'].lstrip('/'),'alt':a.get('alt','')})
  if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.stack.append((tag,a.get('class','').split()))
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==tag:del self.stack[i:];break

def editorial_brief(route,title):
 # New editorial routes have no older image-plan entry. Describe their topic,
 # never animate a named person's portrait or imply a company endorsement.
 topic=title.split(' | ')[0]
 return (f'Create a silent editorial scene interpreting the topic "{topic}". '
         'Use anonymous professional working materials and a considered decision-making action; '
         'no animated portraits, impersonation, quoted speech, readable figures, private data or logos. '
         'A restrained lateral camera movement reveals a second layer of evidence. '
         'Preserve the companion image palette, but do not animate any named person in that image. '
         'Natural physical motion, not a still-image pan; no fabricated Boraden achievements.')

queue=[]
for route,record in routes.items():
 doc=Metadata();doc.feed((ROOT/'_site'/record['file']).read_text())
 p=by_image.get(doc.image)
 brief=p['videoPrompt'] if p else special.get(route) or editorial_brief(route,record['title'])
 slug=route.strip('/').replace('/','--') or 'ana-sayfa'
 sections=[];counts={}
 for shot in doc.sections:
  kind=shot['slot'];counts[kind]=counts.get(kind,0)+1
  slot=kind+'-'+str(counts[kind])
  direction={'scope':'Close inspection of the working material. One deliberate annotation or document comparison; camera close enough to show the procedure without readable sensitive data.',
             'story-shot':'A different composition from the hero and scope: show a human action in its working context. Listening, checking or relating evidence; no staged handshake.',
             'about-scene':'Show an anonymous interdisciplinary discussion from a new angle, with a natural listening and paper-sharing action.'}[kind]
  if kind=='story-shot' and counts[kind]>1:direction='Pull back into the wider working context of the preceding shot; a different camera position and coherent action. Do not repeat the same people arrangement, desk crop or establishing shot.'
  sections.append({**shot,'slot':slot,'target':f'assets/videos/{slug}--{slot}.mp4','status':'pending-provider',
                   'prompt':f'Page context: {record["title"]}. Companion scene: {shot["alt"]}. {direction} '+brief,
                   'presentation':{'frame':'existing padded media area; preserve page structure','videoOpacity':0.64,'textOpacity':1,'playMode':'visible','mobile':'still'}})
 queue.append({'route':route,'title':record['title'],'still':doc.image,'target':'assets/videos/'+slug+'.mp4','status':'pending-provider','prompt':brief,'sections':sections,'delivery':{'durationSeconds':'6–8','audio':False,'maximumHeight':1080,'codec':'H.264 MP4','seeking':'frequent keyframes, HTTP Range support','motion':'one coherent natural action; no random cuts','fallback':'existing distinct still on mobile, reduced motion and loading failure'}})

output={'status':'not-generated','provider':None,'originalVideosProduced':0,'pageBriefs':len(queue),'sectionBriefs':sum(len(p['sections']) for p in queue),'existingLicensedExample':{'route':'/hakkimizda/','path':'assets/meeting-scroll-demo.mp4'},'rules':['No generated scene is evidence of Boraden staff, premises, clients or results.','Do not fabricate statements by named people or animate licensed portraits as endorsements.','Do not load every video eagerly; load only when relevant and honor reduced motion.','Review each delivered clip before assigning its path to a page.','Targets are production briefs, not playable files. Do not insert their paths into the site until actual reviewed clips exist.','Section briefs describe existing media areas only; do not add arbitrary new video sections or replace the approved design.'],'pages':queue}
(ROOT/'research/video-production-queue.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'pageBriefs':len(queue),'sectionBriefs':output['sectionBriefs'],'generatedOriginalVideos':0,'status':'pending-provider'}))
