import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hydrogen()],
  resolve: {
    alias: [{find: /^~\/(.*)/, replacement: '/src/$1'}],
  },
  optimizeDeps: {include: ['@headlessui/react']},
  test: {
    globals: true,
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
