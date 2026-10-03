import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/');
    if(!(await page.locator('.hero h1').innerText()).includes('Tomorrow,')||!(await page.locator('.hero h1').innerText()).includes('practical.'))throw Error('Hero positioning not updated');
    const manifesto=page.locator('.brand-manifesto');
    if(!(await manifesto.getByRole('heading',{name:'Tomorrow, made practical.'}).isVisible()))throw Error('Brand headline absent');
    await manifesto.getByRole('button',{name:/Connect the people and signals/}).click();
    if(!(await manifesto.locator('.brand-manifesto-detail h3').innerText()).includes('factory'))throw Error('Manifesto did not change');
    if(await manifesto.locator('.brand-manifesto-detail a').getAttribute('href')!=='/experience/factory-operations-studio/')throw Error('Pathway link incorrect');
    await page.goto('http://127.0.0.1:5173/about/#brand-perspective');
    if(!(await page.locator('.brand-manifesto').isVisible()))throw Error('About brand positioning absent');
    if(errors.length)throw Error(errors.join('; '));
    console.log(`PASS ${width}: new positioning, interactive pathway and About placement`);await page.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:850}});
  const variants={bn:'আগামীর ভাবনা',fr:'Demain,',de:'Zukunft,',es:'El mañana,',ar:'الغد،'};
  for(const [lang,fragment] of Object.entries(variants)) {
    await page.goto('http://127.0.0.1:5173/');
    await page.getByRole('button',{name:'Open quick actions'}).click();
    await page.locator('#site-language').selectOption(lang);
    await page.waitForTimeout(450);
    const hero=await page.locator('.hero h1').innerText();
    if(!hero.includes(fragment))throw Error(`${lang}: hero missing branded translation: ${hero}`);
    if(await page.evaluate(()=>document.documentElement.scrollWidth)>390)throw Error(`${lang}: mobile overflow`);
    console.log(`PASS ${lang}: brand hero localized`);
  }
  await page.close();
} finally {await browser.close()}
