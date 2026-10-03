import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const routes = [
  '/industries/energy-ev/',
  '/industries/electronics-semiconductors/',
  '/industries/transport-logistics/',
  '/industries/agriculture-food/',
];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 850 } });
    const page = await context.newPage(); const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const route of routes) {
      await page.goto('http://127.0.0.1:5173' + route);
      const playbook = page.locator('.playbook-lenses');
      const buttons = playbook.locator('.playbook-lens-buttons button');
      if (await buttons.count() !== 3) throw Error(`${route}: expected 3 decision lenses`);
      const initialDetail = await playbook.locator('.playbook-lens-detail h3').innerText();
      await buttons.nth(2).click();
      if (await buttons.nth(2).getAttribute('aria-pressed') !== 'true') throw Error(`${route}: selection state missing`);
      if (await playbook.locator('.playbook-lens-detail h3').innerText() === initialDetail) throw Error(`${route}: decision detail did not change`);
      const faq = page.locator('.playbook-faq details').first();
      await faq.locator('summary').click();
      if (!await faq.locator('p').isVisible()) throw Error(`${route}: FAQ did not expand`);
      if (await page.locator('.playbook-related a').count() !== 2) throw Error(`${route}: related journeys missing`);
    }
    if (errors.length) throw Error(errors.join('; '));
    console.log(`PASS ${width}: four playbooks, lens selection, FAQ and related links`);
    await context.close();
  }
} finally { await browser.close(); }
