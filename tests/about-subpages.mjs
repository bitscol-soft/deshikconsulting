import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const profiles=[
  ['/about/leadership/belal-ahmed/','Belal Ahmed','CEO'],
  ['/about/leadership/nizam-farid-ahmed/','Nizam Farid Ahmed','Principal Consultant'],
  ['/about/leadership/nahid-mustafa/','Nahid Mustafa','COO'],
  ['/about/leadership/alamgir-kabir-roni/','Alamgir Kabir Roni','CTO'],
];
try {
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:850}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/about/');
    const directory=page.locator('.about-page-directory');
    if(await directory.locator('a').count()!==8)throw Error('About directory should link eight sections');
    await page.goto('http://127.0.0.1:5173/about/leadership/');
    if(await page.locator('.leadership-grid a').count()!==4)throw Error('Leadership directory should have four profiles');
    for(const [route,name,role] of profiles) {
      await page.goto('http://127.0.0.1:5173'+route);
      if(await page.locator('h1').innerText()!==name)throw Error(`${route}: wrong name`);
      if(!(await page.locator('.leader-hero p').innerText()).includes(role))throw Error(`${route}: wrong role`);
      if(await page.locator('meta[name=robots]').getAttribute('content')!=='noindex, follow')throw Error(`${route}: draft biography should be noindex`);
      if(await page.locator('.leader-profile-body article').count()!==3)throw Error(`${route}: role conversation missing`);
      if(!/confirm|approval|verif/i.test(await page.locator('.leader-profile-note').innerText()))throw Error(`${route}: verification note missing`);
    }
    await page.goto('http://127.0.0.1:5173/about/leadership/nahid-mustafa/');
    if(!(await page.locator('.leader-profile-note').innerText()).includes('Senior Project Manager'))throw Error('Older-profile conflict not disclosed');
    await page.goto('http://127.0.0.1:5173/about/partners-affiliations/');
    await page.locator('.about-detail-faq summary').first().click();
    if(!await page.locator('.about-detail-faq details p').first().isVisible())throw Error('Partner FAQ did not open');
    await page.goto('http://127.0.0.1:5173/about/careers-culture/');
    if(!(await page.locator('.about-editorial-note').innerText()).includes('No open role'))throw Error('Careers draft needs vacancy disclaimer');
    if(errors.length)throw Error(errors.join('; '));
    console.log(`PASS ${width}: About directory, four leadership profiles, roles, notes and FAQs`);
    await page.close();
  }
} finally {await browser.close()}
