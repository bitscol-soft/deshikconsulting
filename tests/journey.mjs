import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const scenarios = [
  { width: 390, goal: 'Prepare product information', context: 'Garments & textiles', stage: 'Ready to scope a pilot', expected: 'RMG product-data readiness', topic: 'rmg' },
  { width: 1440, goal: 'Improve factory performance', context: 'Industrial manufacturing', stage: 'Mapping what we have', expected: 'Industrial Automation', topic: 'automation' },
  { width: 390, goal: 'Set a clearer direction', context: 'Another organization or sector', stage: 'Exploring the question', expected: 'Strategy & Growth', topic: 'strategy' },
];
try {
  for (const item of scenarios) {
    const page = await browser.newPage({ viewport: { width: item.width, height: 850 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/services/');
    const guide = page.locator('.conversion-journey');
    for (const choice of [item.goal, item.context, item.stage]) await guide.getByRole('button', { name: choice }).click();
    const heading = await guide.locator('.journey-result h3').innerText();
    if (heading !== item.expected) throw Error(`Expected ${item.expected}; received ${heading}`);
    const href = await guide.getByRole('link', { name: /Discuss this direction/ }).getAttribute('href');
    if (href !== `/contact/?topic=${item.topic}`) throw Error(`Wrong handoff: ${href}`);
    await page.goto('http://127.0.0.1:5173' + href);
    if (!await page.locator('.contact-context').isVisible()) throw Error('Contact context missing');
    if (errors.length) throw Error(errors.join('; '));
    console.log(`PASS ${item.width}: ${item.expected} -> ${href}`);
    await page.close();
  }
} finally { await browser.close(); }
