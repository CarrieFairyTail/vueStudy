module.exports = {
  assetsDir: 'static', // 静态资源 js css font img 放置的文件夹
  publicPath: './', // 所有的资源会链接为相对路径，这样打出来的包可以被部署在任意路径
  lintOnSave: true // 为true时，eslint-loader在开发和生产构建下都会被启用
  // lintOnSave: process.env.NODE_ENV !== 'production' 生产禁用
}
