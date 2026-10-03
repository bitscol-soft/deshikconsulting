import { cpSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const sourceRoot = 'src';
const outputRoot = 'dist';
const routePattern = /['"`](\/[a-z0-9][a-z0-9/_-]*\/)['"`]/gi;
const routes = new Set();

function collectRoutes(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      collectRoutes(path);
    } else if (/\.[jt]sx?$/.test(entry.name)) {
      const source = readFileSync(path, 'utf8');
      for (const match of source.matchAll(routePattern)) routes.add(match[1]);
    }
  }
}

collectRoutes(sourceRoot);
for (const route of routes) {
  const destination = join(outputRoot, route);
  mkdirSync(destination, { recursive: true });
  cpSync(join(outputRoot, 'index.html'), join(destination, 'index.html'));
}
cpSync(join(outputRoot, 'index.html'), join(outputRoot, '404.html'));

console.log(`Prepared ${routes.size} direct GitHub Pages routes.`);
