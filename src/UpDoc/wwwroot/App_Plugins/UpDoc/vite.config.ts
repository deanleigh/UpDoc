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
    target: 'es2022',
    rollupOptions: {
      external: [/^@umbraco/]
    }
  }
});
