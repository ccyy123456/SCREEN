const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
  //assetsDir: '',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue核心的构建。
  runtimeCompiler: false,
  // 默认情况下babel-loader忽略其中的所有文件node_modules。
  transpileDependencies: [],
  // 生产环境sourceMap
  productionSourceMap: false,
  // webpack配置
  configureWebpack: (config ) => { 
    config.resolve = {
      extensions: ['.js', '.vue', '.json', ".css"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },
  // css相关配置
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
  },
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: null, // 设置代理
    before: app => { },
    overlay: { //关闭eslint
        warnings: false,
        errors: false
    },
  },
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  // 以多页模式构建应用程序。
  // pages: getPages
  // pages:{
  //   index: {
  //     entry: 'src/pages/index/index.js',
  //     template: 'src/pages/index/index.html',
  //     filename: 'index.html',
  //   },
  //   view1: {
  //     entry: 'src/pages/view1/view1.js',
  //     template: 'src/pages/view1/view1.html',
  //     filename: 'view1.html',
  //   },
  //   view2: {
  //     entry: 'src/pages/view2/view2.js',
  //     template: 'src/pages/view2/view2.html',
  //     filename: 'view2.html',
  //   },
  // }
}