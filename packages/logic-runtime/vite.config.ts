import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'), // 打包的入口文件
      name: pkg.name,
      fileName: (format) => `index.${format}.js`,
    },
    outDir: 'lib', // 打包后存放的目录文件
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   prefixCls: 'miracle', // 名称前缀
        // },
        javascriptEnabled: true,
      },
    },
  },
});
