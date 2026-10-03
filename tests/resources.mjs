import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 850 }, acceptDownloads: true });
    const page = await context.newPage(); const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:5173/resources/');
    const hub = page.locator('.resource-glossary');
    if (await hub.locator('article').count() !== 9) throw Error('Glossary is incomplete');
    await hub.getByRole('button', { name: 'Operations' }).click();
    if (await hub.locator('article').count() !== 4) throw Error('Operations filter failed');
    await hub.getByRole('searchbox').fill('baseline');
    if (await hub.locator('article').count() !== 1) throw Error('Glossary search failed');
    await page.goto('http://127.0.0.1:5173/resources/dpp-data-map/');
    await page.getByRole('button', { name: 'Download CSV' }).click();
    if (!await page.getByText('Add at least one field before downloading.').isVisible()) throw Error('Empty CSV should not download');
    await page.getByRole('textbox', { name: 'Information field 1' }).fill('=HYPERLINK("https://example.com")');
    await page.getByRole('textbox', { name: 'Where it lives 1' }).fill('product system');
    await page.getByRole('button', { name: 'Add another field' }).click();
    if (await page.locator('.resource-map-row').count() !== 4) throw Error('Add row failed');
    const csvPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download CSV' }).click();
    const csv = await csvPromise; const csvText = await readFile(await csv.path(), 'utf8');
    if (csv.suggestedFilename() !== 'deshik-product-data-map.csv' || !csvText.includes("'=HYPERLINK")) throw Error('CSV export or formula protection failed');
    await page.getByRole('button', { name: 'Clear worksheet' }).click();
    if (await page.locator('.resource-map-row').count() !== 3) throw Error('Worksheet reset failed');
    await page.goto('http://127.0.0.1:5173/resources/automation-pilot-canvas/');
    await page.getByRole('button', { name: 'Download working canvas' }).click();
    if (!await page.getByText('Add at least one note before downloading.').isVisible()) throw Error('Empty canvas should not download');
    await page.getByRole('textbox', { name: /Operating question/ }).fill('Reduce delayed stop reporting.');
    const textPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download working canvas' }).click();
    const text = await textPromise; const body = await readFile(await text.path(), 'utf8');
    if (text.suggestedFilename() !== 'deshik-automation-pilot-canvas.txt' || !body.includes('Reduce delayed stop reporting.')) throw Error('Canvas export failed');
    if (errors.length) throw Error(errors.join('; '));
    console.log(`PASS ${width}: glossary, worksheet CSV, safe export and pilot canvas`);
    await context.close();
  }
} finally { await browser.close(); }
