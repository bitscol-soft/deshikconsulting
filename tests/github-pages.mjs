import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = '/deshikconsulting/';
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const mimeTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('https://pages-preview.invalid/**', async route => {
    const pathname = decodeURIComponent(new URL(route.request().url()).pathname);
    const relativePath = pathname.startsWith(base) ? pathname.slice(base.length) : null;
    let file = relativePath ? join(dist, relativePath) : join(dist, '404.html');
    if (relativePath?.endsWith('/')) file = join(file, 'index.html');
    try {
      const body = await readFile(file);
      await route.fulfill({
        body,
        contentType: mimeTypes[extname(file)] || 'application/octet-stream',
        status: 200
      });
    } catch {
      await route.fulfill({
        body: await readFile(join(dist, '404.html')),
        contentType: 'text/html',
        status: 404
      });
    }
  });

  for (const path of ['', 'about/', 'services/digital-product-passport/', 'experience/dpp-product-journey/']) {
    await page.goto(`https://pages-preview.invalid${base}${path}`, { waitUntil: 'networkidle' });
    if (!(await page.locator('#root').innerText()).trim()) throw new Error(`Empty page at ${path || '/'}`);
    const logo = page.locator('header .logo-image');
    if (await logo.count() && !(await logo.evaluate(image => image.complete && image.naturalWidth > 0))) {
      throw new Error(`Logo asset did not load at ${path || '/'}`);
    }
  }

  await page.goto(`https://pages-preview.invalid${base}`);
  await page.getByRole('link', { name: /Explore industries/i }).first().click();
  if (!new URL(page.url()).pathname.startsWith(`${base}industries/`)) {
    throw new Error('Internal navigation escaped the GitHub Pages base path');
  }
  if (errors.length) throw new Error(errors.join('; '));
  console.log('PASS: GitHub Pages assets, deep routes and internal navigation');
} finally {
  await browser.close();
}
