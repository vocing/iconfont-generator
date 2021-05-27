#!/usr/bin/env node

const path = require('path')  
const webpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs')
const watch = require('watch')
const cwd = process.cwd()

const checkDir = require('./help/checkDir.js')
const createHtml = require('./help/createHtml.js')
const delay = require('./help/delay.js')()

const defaultDir = 'iconfont'
let options = {
  fontName: 'my-icon',
  cssPrefix: 'ico',
  svgs: `${defaultDir}/svg/*.svg`,
  cssOutput: `${defaultDir}/font.css`,
  fontsOutput: defaultDir,
  htmlOutput: false
}
try {
  const config = require(path.resolve(cwd, 'iconfont-generator.config.js'))
  Object.assign(options, config)
} catch (e) {
  console.log('当前无用户配置, 使用默认配置')
}

// 获取文件夹路径, 并检测其如不存在, 则创建各级路径
const folder = options.svgs.replace(/\/\*\.svg$/, '')
checkDir(folder)

let callback = () => {
  new webpackIconfontPluginNodejs(options).build()
  createHtml(folder, options)
}
callback()

/**
 * 监听文件夹变更, 重新生成文件
 */
watch.createMonitor(folder, (monitor) => {
  console.log(`启用监听iconfont: ${folder}`)
  monitor.on('created', () => {
    delay(callback)
  })
  monitor.on('changed', () => {
    delay(callback)
  })
  monitor.on('removed', () => {
    delay(callback)
  })
})

