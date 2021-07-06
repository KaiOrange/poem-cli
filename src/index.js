#!/usr/bin/env node
"use strict"
const colorUtil = require('./color-util')
const randomPoem = require('./random-poem')
let argv = require('yargs')
    .option('s', {
      alias: 'style',
      demand: false,
      boolean: true,
      describe: '显示所支持的样式',
    }).option('ps', {
        alias: 'poem-style',
        demand: false,
        default: 'blue_bt',
        describe: '诗词样式，如--ps=blue_bt',
        type: 'string'
    }).option('as', {
        alias: 'author-style',
        demand: false,
        default: 'green_bt',
        describe: '作者样式，如--as=green_bt',
        type: 'string'
    }).option('os', {
      alias: 'origin-style',
      demand: false,
      default: 'cyan',
      describe: '来源颜色，如--os=cyan',
      type: 'string'
    }).option('h', {
      alias: 'help',
      demand: false,
      boolean: true,
      describe: '帮助',
    }).option('v', {
      alias: 'version',
      demand: false,
      boolean: true,
      describe: '版本号',
    })
    .argv;

// 显示所支持的样式
if (!!argv.s) {
  console.log();
  colorUtil.printSupportStyle();
} else {
  randomPoem().then(function (data){
    let signature = data.author + '《' + data.origin + '》';
    let prefix =  '———— ';
    let paddingSpacing = '';
    let spacingLength = data.content.length * 2 - signature.length * 2 - prefix.length;
    if (spacingLength > 0) {
      if (data.origin.indexOf('·') !== -1) {
        spacingLength++;
      }
      paddingSpacing = new Array(spacingLength).fill(' ').join('');
    }
    try {
      // 添加颜色
      signature = colorUtil.getColorMethod(argv.as)(data.author) + '《' + colorUtil.getColorMethod(argv.os)(data.origin) + '》';
      signature = (paddingSpacing + prefix) + signature
      console.log();
      console.log(colorUtil.getColorMethod(argv.ps)(data.content));
      console.log(signature);
      console.log();
    } catch (error) {
      // 错误处理
      console.log('\n' + colorUtil.color.red(error.message));
      colorUtil.printSupportStyle();
    }
  })
}
