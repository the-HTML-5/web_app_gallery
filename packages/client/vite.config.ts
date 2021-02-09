import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js',
    // balm-ui@9.1.0+
    'balm-ui': 'balm-ui/dist/balm-ui.esm.js',
    'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
    'balm-ui-css': 'balm-ui/dist/balm-ui.css',
  },
  optimizeDeps: {
    // Remove useless warning for `balm-ui`
    exclude: ['balm-ui'],
  },
});
