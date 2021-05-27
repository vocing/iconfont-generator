# iconfont-generator
字体图标生成工具

# description
监听: npm run iconfont-generator
使用工具后, 会自动监听svg文件夹的变更, 重新生成 options.cssOutput 文件
同时也会在svg文件夹同级生成 example/index.html文件, 可打开此文件查看所有字体图标

# optoins
如果需要修改预设配置, 需要在根目录下 iconfont-generator.config.js 中修改配置参数
默认内容: 
module.exports = {
  fontName: 'my-icon', // 名称
  cssPrefix: 'ico', // 前缀
  svgs: `iconfont/svg/*.svg`, // svg存放目录
  cssOutput: `iconfont/font.css`, // 字体图标生成文件地址
  fontsOutput: 'iconfont', // 字体图标生成目录
  htmlOutput: false
}
