const fs = require('fs')
const path = require('path') 
const checkDir = require('./checkDir.js')
/**
 * 创建html, 展示生成的图标库
 */
const example = (folder, options) => {
  let data = `<!DOCTYPE html>
<html lang="en" style="width:100%; height: 100%; overflow: hidden;">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=0" />
    <meta name="format-detection" content="telphone=no" />
    <link rel="stylesheet" href="${path.relative(folder, options.cssOutput)}" />
    <title></title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            text-align: center;
        }
        .content {
            display: flex;
            flex-wrap: wrap;
        }
        .li {
            width: 150px;
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
        }
        .icon {
            font-size: 32px;
        }
    </style>
</head>
<body>
    <h1 style="padding: 20px 0;">iconfont图标库</h1>
    <article class="content">
`
  let paths = fs.readdirSync(folder)
  paths = paths.map((item) => item.replace(/\.svg$/, '')).sort()
  const arr = paths.map((item) => {
    const clas = `${options.cssPrefix ? options.cssPrefix + '-' : ''}${item}`
    return `<div class="li"><p class="icon ${clas}"></p><p>${clas}</p></div>`
  })
  data +=
    arr.join('') +
    `
    </article>
</body>
</html>`
  checkDir(path.resolve(folder, '../example'))
  fs.writeFileSync(path.resolve(folder, '../example/index.html'), data)
}

module.exports = example