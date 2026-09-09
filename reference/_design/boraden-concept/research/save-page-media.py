"""Save selected tool outputs as web photographs; no crop or colour changes."""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REGISTER = ROOT / 'research/page-media-generated.json'
record = json.loads(REGISTER.read_text())
plan_path = ROOT / 'research/page-media-plan.json'
plan = json.loads(plan_path.read_text())
plans = {item['id']: item for item in plan}

for item in record['generated']:
    target = (ROOT / item['path']).resolve()
    if not target.is_relative_to(ROOT / 'assets/pages'):
        raise ValueError('Page asset destination must stay inside assets/pages')
    source = Path(item['source'])
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    if item.get('sourceSha256') != digest or not target.is_file():
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as image:
            image.convert('RGB').save(target, 'JPEG', quality=92, optimize=True)
            item['width'], item['height'] = image.size
        item['sourceSha256'] = digest
    item['bytes'] = target.stat().st_size
    item['sha256'] = hashlib.sha256(target.read_bytes()).hexdigest()
    plans[item['id']]['imageStatus'] = 'generated'

REGISTER.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n')
plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'saved':len(record['generated']), 'planned':len(plan)}))
