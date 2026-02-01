import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'updoc'
    },
    outDir: 'dist',
    emptyDirFirst: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/]
    }
  }
});
