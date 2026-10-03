import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], build: { rollupOptions: { output: { manualChunks(id) { if (id.includes('/node_modules/gsap/')) return 'motion-vendor'; if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor'; } } } }, server: {host: '0.0.0.0', allowedHosts: true}, preview: {host:'0.0.0.0', allowedHosts:true} });
