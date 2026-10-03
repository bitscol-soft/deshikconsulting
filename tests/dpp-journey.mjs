import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
  for(const width of [390,1440]) {
    const context=await browser.newContext({viewport:{width,height:850},acceptDownloads:true,reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/experience/dpp-product-journey/');
    await page.locator('.journey-experience').waitFor();
    if(await page.locator('meta[name=robots]').getAttribute('content')!=='noindex, follow')throw Error('Fictional experience should be noindex');
    const preview=page.locator('.journey-preview');
    if(await preview.locator('dl>div').count()!==3)throw Error('Public view should have three fields');
    await page.getByRole('button',{name:'Buyer workspace'}).click();
    if(await preview.locator('dl>div').count()!==5)throw Error('Buyer view should have five fields');
    await page.getByRole('button',{name:'Internal team'}).click();
    if(await preview.locator('dl>div').count()!==7)throw Error('Internal view should have seven fields');
    await page.getByRole('button',{name:'Version 02'}).click();
    if(!await page.getByText('Missing example declaration').first().isVisible())throw Error('Version change not reflected');
    await page.getByRole('button',{name:'Attach simulated reference'}).click();
    if(!await page.getByText('Simulated evidence attached').first().isVisible())throw Error('Evidence simulation failed');
    await page.locator('.journey-map-buttons button').nth(3).click();
    if(!await page.getByRole('heading',{name:'Review evidence'}).last().isVisible())throw Error('Handoff stage not updated');
    const downloadPromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'Download fictional example'}).click();
    const download=await downloadPromise;
    const data=JSON.parse(await readFile(await download.path(),'utf8'));
    if(download.suggestedFilename()!=='deshik-fictional-product-record.json'||data.version!=='Version 02'||data.audience!=='internal'||!data.notice.includes('FICTIONAL'))throw Error('Download must be an explicitly fictional v2 record');
    await page.getByRole('button',{name:'Reset experience'}).click();
    if(await preview.locator('dl>div').count()!==3)throw Error('Reset did not restore public view');
    if(errors.length)throw Error(errors.join('; '));
    console.log(`PASS ${width}: fictional journey, roles, versions, evidence, JSON export and reset`);
    await context.close();
  }
} finally {await browser.close()}
