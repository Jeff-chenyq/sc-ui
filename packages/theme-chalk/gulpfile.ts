import path from 'path'
import { Transform } from 'stream'
import { epOutput } from '@sc-ui/build'
import chalk from 'chalk'
import consola from 'consola'
import cssnano from 'cssnano'
import fs from 'fs-extra'
import { parallel, src, dest, series } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import gulpSass from 'gulp-sass'
import postcss from 'postcss'
import dartSass from 'sass'
import type Vinly from 'vinyl'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme-chalk')

/**
 * cssnano 压缩css
 */
function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // avoid color transform
          colormin: false,
          // avoid font transform
          minifyFontValues: false
        }
      ]
    })
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinly
      if (file.isNull()) {
        callback(null, file)
        return
      }
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        const name = path.basename(file.path)
        file.contents = Buffer.from(result.css)
        consola.success(
          `${chalk.cyan(name)}: ${chalk.yellow(
            cssString.length / 1000
          )} KB -> ${chalk.green(result.css.length / 1000)} KB`
        )
        callback(null, file)
      })
    }
  })
}

/**
 * 将scss 文件拷贝到 theme-chalk下
 */
export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(distBundle, 'src'))
  )
}

export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

/**
 * Build dark Css Vars
 * @returns
 */
// function buildDarkCssVars() {
//   const sass = gulpSass(dartSass)
//   return src(path.resolve(__dirname, 'src/dark/css-vars.scss'))
//     .pipe(sass.sync())
//     .pipe(autoprefixer({ cascade: false }))
//     .pipe(compressWithCssnano())
//     .pipe(dest(`${distFolder}/dark`))
// }

export const clean = async () => {
  await Promise.all([fs.remove(distFolder)])
}

function buildThemeChalk() {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base|display)/

  return (
    src(path.resolve(__dirname, 'src/*.scss'))
      // scss -> css
      .pipe(sass.sync())
      // 添加浏览器前缀 cascade 是否美化
      .pipe(autoprefixer({ cascade: false }))
      // 压缩css cssnano 能为你的 CSS 文件做多方面的的优化， 以确保最终生成的文件 对生产环境来说体积是最小的。
      .pipe(compressWithCssnano())
      .pipe(
        // 重命名
        rename((path) => {
          if (!noElPrefixFile.test(path.basename)) {
            path.basename = `sc-${path.basename}`
          }
        })
      )
      .pipe(dest(distFolder))
  )
}

export const build = parallel(
  copyThemeChalkSource,
  series(clean, buildThemeChalk, copyThemeChalkBundle)
)

export default build
