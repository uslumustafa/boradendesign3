"""Create responsive encodings without changing composition or the original assets."""
from pathlib import Path
import json,hashlib
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]
assets=ROOT/'assets'
manifest={}
for source in sorted(assets.rglob('*.jpg')):
    if 'responsive' in source.parts:continue
    relative=source.relative_to(ROOT).as_posix()
    with Image.open(source) as opened:
        image=ImageOps.exif_transpose(opened).convert('RGB')
        w,h=image.size
        sizes=sorted(set(min(n,w) for n in (640,1280,1672)))
        variants=[]
        for width in sizes:
            target=assets/'responsive'/source.relative_to(assets).parent/(source.stem+f'-{width}.webp')
            target.parent.mkdir(parents=True,exist_ok=True)
            resized=image.resize((width,round(h*width/w)),Image.Resampling.LANCZOS)
            resized.save(target,'WEBP',quality=82,method=6)
            variants.append({'width':width,'height':resized.height,'src':target.relative_to(ROOT).as_posix(),'bytes':target.stat().st_size})
        manifest[relative]={'width':w,'height':h,'bytes':source.stat().st_size,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'variants':variants}
(ROOT/'research/image-variants.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print(json.dumps({'images':len(manifest),'originalBytes':sum(x['bytes'] for x in manifest.values()),'largestWebpBytes':sum(x['variants'][-1]['bytes'] for x in manifest.values())}))
