import { defineConfig } from 'dumi';
const path = require('path');
const repo = 'antd';
const chainWebpack = require('webpack-chain');

export default defineConfig({
  title: repo,
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi-template',
    },
  ],
  // chainWebpack(memo) {
  //   // 设置 alias
  //   memo.resolve
  //     .alias
  //     .set('antd', path.resolve(__dirname, 'src/index.ts'))
  // },
  // locales:[['zh-CN', '中文'],['en-US', 'English']]
  // more config: https://d.umijs.org/config
});
