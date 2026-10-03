import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
  for(const width of [390,1440]) {
    const context=await browser.newContext({viewport:{width,height:850},acceptDownloads:true,reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/experience/factory-operations-studio/');
    await page.locator('.factory-studio').waitFor();
    if(await page.locator('meta[name=robots]').getAttribute('content')!=='noindex, follow')throw Error('Fictional studio must be noindex');
    const scenario=page.locator('.factory-scenario-tabs');
    await scenario.getByRole('button',{name:/Delayed quality feedback/}).click();
    if(!await page.getByText('Inspection handoff — fictional').isVisible())throw Error('Scenario not updated');
    await page.locator('.factory-stage-list button').nth(2).click();
    if(!await page.getByRole('heading',{name:'Team response'}).last().isVisible())throw Error('Flow stage not updated');
    await page.getByRole('button',{name:/Scope a read-only pilot for review/}).click();
    const checks=page.locator('.factory-pilot-controls input[type=checkbox]');
    await checks.nth(0).check();await checks.nth(1).check();
    if(!await page.getByText('Planning inputs noted. Qualified review is still required.').isVisible())throw Error('Boundary status not updated');
    const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Download fictional brief'}).click();const download=await downloadPromise;
    const data=JSON.parse(await readFile(await download.path(),'utf8'));
    if(download.suggestedFilename()!=='deshik-fictional-factory-brief.json'||!data.notice.includes('FICTIONAL')||data.scenario!=='Delayed quality feedback'||data.reviewMode!=='scope'||!data.planningInputs.readOnlyBoundaryNoted)throw Error('Fictional brief export incorrect');
    await page.getByRole('button',{name:'Reset studio'}).click();
    if(await scenario.getByRole('button',{name:/Repeated short stops/}).getAttribute('aria-pressed')!=='true')throw Error('Reset did not restore first scenario');
    if(errors.length)throw Error(errors.join('; '));
    console.log(`PASS ${width}: scenarios, flow, boundary checks, fictional export and reset`);
    await context.close();
  }
} finally {await browser.close()}
