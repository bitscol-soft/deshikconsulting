import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';

const traverse = traverseModule.default;
const generate = generateModule.default;
const githubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBase = process.env.GITHUB_PAGES_BASE || '/deshikconsulting/';

function githubPagesPaths() {
  return {
    name: 'github-pages-paths',
    enforce: 'pre',
    transform(code, id) {
      if (!githubPages || id.endsWith('/src/paths.js') || !id.startsWith(`${process.cwd()}/src/`) || !/\.[jt]sx?$/.test(id)) return null;
      const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
      let changed = false;
      traverse(ast, {
        StringLiteral(path) {
          const { node, parent } = path;
          if (!node.value.startsWith('/') || node.value.startsWith('//')) return;
          if (parent.type === 'ObjectProperty' && parent.key === node && !parent.computed) return;
          if (node.value === '/') {
            const isLinkProperty = parent.type === 'ObjectProperty'
              && parent.value === node
              && ['href', 'link', 'path', 'src', 'url'].includes(parent.key.name || parent.key.value);
            const isJsxLink = parent.type === 'JSXAttribute'
              && ['href', 'src'].includes(parent.name.name);
            if (!isLinkProperty && !isJsxLink) return;
          }
          node.value = `${githubPagesBase.slice(0, -1)}${node.value}`;
          changed = true;
        }
      });
      return changed ? generate(ast, {}, code) : null;
    }
  };
}

export default defineConfig({
  base: githubPages ? githubPagesBase : '/',
  plugins: [githubPagesPaths(), react()],
  build: { rollupOptions: { output: { manualChunks(id) { if (id.includes('/node_modules/gsap/')) return 'motion-vendor'; if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor'; } } } },
  server: { host: '0.0.0.0', allowedHosts: true },
  preview: { host: '0.0.0.0', allowedHosts: true }
});
