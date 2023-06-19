import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.tsx'), // 打包的入口文件
      name: pkg.name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
        },
      },
    },
    outDir: 'lib', // 打包后存放的目录文件
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          prefixCls: 'miracle', // 名称前缀
        },
        javascriptEnabled: true,
      },
    },
  },
});
