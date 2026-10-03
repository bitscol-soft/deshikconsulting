import { chromium } from 'playwright';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./viewport.mjs',import.meta.url),'utf8');
const paths=Function('return '+source.match(/const paths=(\[[\s\S]*?\]);/)[1])();
paths.push('/services/trusted-data-gateway/','/about/consultants/','/about/work-as-consultant/');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const errors=[];
for(const lang of (process.env.LANGS?.split(',')||['hi','ur','id','vi','km','si','ta','fil'])){
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:850}});page.on('pageerror',e=>errors.push(`${lang} ${width}: ${e.message}`));
  await page.goto('http://127.0.0.1:5173/');await page.evaluate(l=>localStorage.setItem('deshik-language',l),lang);
  for(const path of paths){await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'domcontentloaded'});await page.waitForFunction(l=>document.documentElement.lang===l&&!!document.querySelector('h1'),lang,{timeout:8000});await page.waitForTimeout(70);const x=await page.evaluate(()=>({lang:document.documentElement.lang,dir:document.documentElement.dir,scroll:document.documentElement.scrollWidth,width:innerWidth,heading:document.querySelector('h1')?.textContent?.trim()}));if(x.lang!==lang||x.dir!==(lang==='ur'?'rtl':'ltr')||x.scroll>x.width+2||!x.heading||(path==='/services/trusted-data-gateway/'&&x.heading.includes('Trusted Data')))errors.push(`${lang} ${width} ${path}: ${JSON.stringify(x)}`)}
  console.log(lang,width,paths.length,'routes');await page.close();
 }
}
await browser.close();console.log(errors.length?errors.slice(0,30).join('\n'):'PASS: new language routes, direction, headings, overflow and JS');if(errors.length)process.exit(1);
