const fs = require('fs')
const stat = fs.stat

//  检测目录, 如果不存在则创建目录
function checkDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    return true
}

//  创建多级目录
function exists(src, dst) {
    const dir = dst.split('/')
    for (let i = 0; i < dir.length; i++) {
        checkDir(`${cwd}/${dir.slice(0, i + 1).join('/')}`)
    }
    copy(src, dst)
}

function copy(src, dst) {
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err
        }
        paths.forEach(function (path) {
            const _src = src + '/' + path
            const _dst = dst + '/' + path
            let readable
            let writable
            stat(_src, function (err, st) {
                if (err) {
                    throw err
                }

                if (st.isFile()) {
                    stat(_src, function (err, st) {
                        if (err) {
                            throw err
                        }

                        if (st.isFile()) {
                            readable = fs.createReadStream(_src)
                            writable = fs.createWriteStream(_dst)
                            readable.pipe(writable)
                        } else if (st.isDirectory()) {
                            exists(_src, _dst, copy)
                        }
                    })
                    readable = fs.createReadStream(_src)
                    writable = fs.createWriteStream(_dst)
                    readable.pipe(writable)
                } else if (st.isDirectory()) {
                    checkDir(_dst)
                    copy(_src, _dst)
                }
            })
        })
    })
}

module.exports = checkDir