import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 850 }, acceptDownloads: true });
    const page = await context.newPage(); const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/insights/dpp-readiness-questions/');
    await page.locator('.dpp-flow-steps').waitFor();
    const flow = page.locator('.dpp-flow');
    await flow.getByRole('button', { name: /Supplier evidence/ }).click();
    if (!await flow.getByRole('heading', { name: 'Supplier evidence' }).isVisible()) throw Error('Infographic selection not reflected');
    const guide = page.locator('.dpp-wizard');
    await guide.getByRole('button', { name: 'Not sure yet' }).click();
    await guide.getByRole('button', { name: 'Partly / in progress' }).click();
    await guide.getByRole('button', { name: 'Yes, with an owner' }).click();
    await guide.getByRole('button', { name: 'Not sure yet' }).click();
    if (!await guide.getByText('Priorities to clarify').isVisible()) throw Error('Personalized priorities missing');
    const downloadPromise = page.waitForEvent('download');
    await guide.getByRole('button', { name: 'Download my checklist' }).click();
    const download = await downloadPromise;
    if (download.suggestedFilename() !== 'deshik-dpp-orientation.txt') throw Error('Wrong checklist filename');
    await guide.getByRole('button', { name: 'Start again' }).click();
    if (!await guide.getByText('Have you defined the product family and destination market?').isVisible()) throw Error('Wizard reset failed');
    const faq = page.locator('.dpp-faq');
    await faq.getByText('Does every garment need a Digital Product Passport now?').click();
    if (!await faq.getByText(/No universal garment DPP requirement/).isVisible()) throw Error('FAQ disclosure failed');
    if (errors.length) throw Error(errors.join('; '));
    console.log(`PASS ${width} DPP flow, wizard, download, FAQ`);
    await page.goto('http://127.0.0.1:5173/insights/');
    const library = page.locator('.editorial-library');
    await library.getByRole('button', { name: 'Emerging tech' }).click();
    if (await library.locator('.editorial-card').count() !== 4) throw Error('Emerging tech filter should show four guides');
    await library.getByRole('searchbox').fill('semiconductor');
    if (await library.locator('.editorial-card').count() !== 1) throw Error('Search did not narrow results');
    if (await library.locator('.editorial-card').first().getAttribute('href') !== '/insights/semiconductor-value-chain/') throw Error('Wrong search result');
    await library.getByRole('searchbox').fill('');
    await library.getByRole('button', { name: 'All', exact: true }).click();
    if (await library.locator('.editorial-card').count() !== 9) throw Error('All guides not restored');
    if (errors.length) throw Error(errors.join('; '));
    console.log(`PASS ${width} editorial filters, search, nine guides`);
    await context.close();
  }
} finally { await browser.close(); }
