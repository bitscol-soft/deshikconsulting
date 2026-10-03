"""Generate machine-translation drafts of public English UI/content phrases.
Not a production localization workflow: qualified native/editorial and legal review required.
Uses Google Translate public endpoint as a temporary drafting aid; manually review every entry.
"""
import concurrent.futures
import json
import re
import time
import requests
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
phrases = json.loads((ROOT / 'translation-source.json').read_text())
phrases = [s for s in phrases if re.match(r'^(?:[A-Z](?:[A-Za-z]|\s)|\d\d\s/)', s) and not re.search('[\u0980-\u09ff\u0600-\u06ff]', s) and len(s)>4 and not s.startswith('DESHIK / ')]
chunks=[]; batch=[]; count=0
for s in phrases:
    if count+len(s)>1700 and batch: chunks.append(batch);batch=[];count=0
    batch.append(s);count+=len(s)+1
if batch:chunks.append(batch)
print('phrases',len(phrases),'chunks',len(chunks),flush=True)

def translate_one(lang, chunk):
    for attempt in range(4):
        try:
            r=requests.get('https://translate.googleapis.com/translate_a/single',params={'client':'gtx','sl':'en','tl':lang,'dt':'t','q':'\n'.join(chunk)},timeout=30)
            r.raise_for_status()
            lines=''.join(part[0] for part in r.json()[0]).split('\n')
            if len(lines)!=len(chunk):
                raise ValueError(f'line mismatch: {len(lines)} vs {len(chunk)}')
            return {a:b.strip() for a,b in zip(chunk,lines)}
        except Exception as e:
            if attempt==3: print('FAILED',lang,str(e)[:100],flush=True);return {}
            time.sleep(1+attempt)

targets=sys.argv[1:] or ['bn','fr','de','es','ar','hi','ur','id']
out={lang:json.loads((ROOT/'src'/'draft-locales'/f'{lang}.json').read_text()) if (ROOT/'src'/'draft-locales'/f'{lang}.json').exists() else {} for lang in targets}
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
    futures={pool.submit(translate_one,lang,chunk):lang for lang in out for chunk in chunks if any(s not in out[lang] for s in chunk)}
    for i,f in enumerate(concurrent.futures.as_completed(futures),1):
        lang=futures[f];out[lang].update(f.result() or {})
        if i%20==0:print(i,'/',len(futures),flush=True)

for lang,terms in out.items():
    (ROOT/'src'/'draft-locales'/f'{lang}.json').write_text(json.dumps(terms,ensure_ascii=False,separators=(',',':')))
print({k:len(v) for k,v in out.items()},flush=True)
