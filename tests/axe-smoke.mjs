import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    for (const path of ['/', '/about/', '/services/', '/contact/', '/insights/rmg-product-story/', '/insights/', '/insights/dpp-readiness-questions/', '/insights/ai-ready-data/', '/industries/energy-ev/', '/industries/electronics-semiconductors/', '/resources/', '/resources/dpp-data-map/', '/resources/automation-pilot-canvas/', '/experience/dpp-product-journey/', '/experience/factory-operations-studio/', '/about/leadership/', '/about/leadership/nahid-mustafa/', '/about/mission/', '/about/careers-culture/']) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:5173' + path);
      await page.waitForTimeout(700);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const violations = results.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(', ')}`);
      if (violations.length) throw Error(`${width} ${path}: ${violations.join('; ')}`);
      console.log(`PASS axe ${width} ${path}`);
      await context.close();
    }
  }
} finally { await browser.close(); }
