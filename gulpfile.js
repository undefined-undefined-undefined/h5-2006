const gulp = require('gulp')

// 导入 gulp-cssmin
const cssmin = require('gulp-cssmin')

// 导入 gulp-autoprefiexer
const autoprefixer = require('gulp-autoprefixer')

// 导入 gulp-sass
const sass = require('gulp-sass')

// 导入 gulp-uglify
const uglify = require('gulp-uglify')

// 导入 gulp-babel
const babel = require('gulp-babel')

// 导入 gulp-htmlmin
const htmlmin = require('gulp-htmlmin')

// 导入 del
const del = require('del')

// 导入 gulp-webserver
const webserver = require('gulp-webserver')



//打包 sass 文件的任务
const sassHandler = function () {
  return gulp
    .src('./src/sass/*.scss') // 找到文件
    .pipe(sass()) // 把 sass 转换成 css
    // .pipe(autoprefixer()) // 自动添加前缀
    // .pipe(cssmin()) // 压缩 css 代码
    .pipe(gulp.dest('./dist/css/')) // 放在指定目录下
}


//打包 JS 文件的任务
const jsHandler = function () {
    return gulp
      .src('./src/js/*.js') // 找到文件
      // .pipe(babel({ presets: [ '@babel/preset-env' ] })) // 转换成 ES5 的语法
      // .pipe(uglify()) // 执行压缩
      .pipe(gulp.dest('./dist/js/')) // 放到指定目录
}

  // 打包 html 文件的任务
const htmlHandler = function () {
    return gulp
      .src('./src/pages/*.html') // 找到文件
      // .pipe(htmlmin({
      //   collapseWhitespace: true, // 去除掉空格
      //   collapseBooleanAttributes: true, // 简写值为布尔值的属性
      //   removeAttributeQuotes: true, // 去除属性上的双引号
      //   removeEmptyAttributes: true, // 去除空属性
      //   removeStyleLinkTypeAttributes: true, // 移出 style 和 link 标签身上的 type 属性
      //   removeScriptTypeAttributes: true, // 移出 script 标签身上的 type 属性
      //   removeComments: true, // 移出注释
      //   minifyCSS: true, // 会把内嵌式的 css 样式压缩
      //   minifyJS: true, // 会把内嵌式的 js 代码压缩
      // })) // 压缩 html 文件
      .pipe(gulp.dest('./dist/pages/')) // 放到指定目录下
}
const indexHandler = function () {
  return gulp
    .src('./src/index.html') // 找到文件
    // .pipe(htmlmin({
    //   collapseWhitespace: true, // 去除掉空格
    //   collapseBooleanAttributes: true, // 简写值为布尔值的属性
    //   removeAttributeQuotes: true, // 去除属性上的双引号
    //   removeEmptyAttributes: true, // 去除空属性
    //   removeStyleLinkTypeAttributes: true, // 移出 style 和 link 标签身上的 type 属性
    //   removeScriptTypeAttributes: true, // 移出 script 标签身上的 type 属性
    //   removeComments: true, // 移出注释
    //   minifyCSS: true, // 会把内嵌式的 css 样式压缩
    //   minifyJS: true, // 会把内嵌式的 js 代码压缩
    // })) // 压缩 html 文件
    .pipe(gulp.dest('./dist/')) // 放到指定目录下
}

//  打包 image 文件的任务
const imageHandler = function () {
    return gulp
      .src('./src/img/**.*')
      .pipe(gulp.dest('./dist/img/'))
}

//打包juqery等公共的任务
const assetsHandler = function () {
  return gulp
    .src('./src/assets/**')
    .pipe(gulp.dest('./dist/assets/'))
}
// 打包一个 server php的 任务
const serversHandler = function () {
  return gulp
    .src('./src/servers/**')
    .pipe(gulp.dest('./dist/servers/'))
}
//打包一个 font 的任务
const iconHandler = function () {
  return gulp
    .src('./src/font/**')
    .pipe(gulp.dest('./dist/font/'))
}
const icon1Handler = function () {
  return gulp
    .src('./src/font-detail/**')
    .pipe(gulp.dest('./dist/font-detail/'))
}
const icon2Handler = function () {
  return gulp
    .src('./src/font_ri/**')
    .pipe(gulp.dest('./dist/font_ri/'))
}

  //配置一个删除的任务
const delHandler = function () {
    return del([ './dist/' ])
}

//配置一个监控任务
const watchHandler = function () {
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/sass/*.scss', sassHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/servers/*.php', serversHandler)
    gulp.watch('./src/assets/**', assetsHandler)
    gulp.watch('./src/img/**', imageHandler)
    gulp.watch('./src/font/**', iconHandler)
}

//配置一个统一管理的任务
const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(sassHandler, icon2Handler,icon1Handler,iconHandler,jsHandler,serversHandler,htmlHandler,imageHandler,assetsHandler,indexHandler),
    // webHandler,
    watchHandler
  )


// 导出 sassHandler
module.exports.sassHandler = sassHandler
// 导出 jsHandler
module.exports.jsHandler = jsHandler
// 导出 htmlHandler
module.exports.htmlHandler = htmlHandler
// 导出 imageHandler
module.exports.imageHandler = imageHandler
// 导出 defaultHandler
module.exports.default = defaultHandler
// 导出 delHandler
module.exports.delHandler = delHandler
// 导出 assetsHandler
module.exports.assetsHandler = assetsHandler
//导出 serversHandler
module.exports.serversHandler = serversHandler
//导出 indexHandler
module.exports.indexHandler = indexHandler
//导出 iconHandler
module.exports.iconHandler = iconHandler
module.exports.icon2Handler = icon2Handler
module.exports.icon1Handler = icon1Handler
