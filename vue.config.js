const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'Wecredo-Cloud-UI',
  assetsDir: 'assets',
  // indexPath: 'index.html',
  // filenameHashing: true,
  configureWebpack: {
	  // devtool
	  devtool: 'source-map'
	},
  // pages: {
  //  index: {
  //      entry: "./src/main.js", // 配置入口js文件
  //      template: "./public/index.html", // 主页面
  //      filename: "index.html", // 打包后的html文件名称
  //     //  title: "首页", // 打包后的.html中<title>标签的文本内容
  //      // 在这个页面中包含的块，默认情况下会包含
  //      // 提取出来的通用 chunk 和 vendor chunk。
  //      chunks: ['chunk-vendors', 'chunk-common', 'index']
  //  },
  //  sso: {//新增的部份
  //     entry: "./src/sso/main.js", // 配置入口js文件
  //     template: "./src/sso/sso.html", // 主页面
  //     filename: "sso.html", // 打包后的html文件名称
  //     title: "后台", // 打包后的.html中<title>标签的文本内容
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'sso']
  //  },
  // },
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 不在production环境使用SourceMap
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 命名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@img', resolve('src/assets/images'))
    // 打包文件带hash
    config.output.filename('[name].[hash].js').end()
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/assets/scss/index.scss'
        })
        .end()
    })
    // 为了补删除换行而加的配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
  configureWebpack: {
    externals: {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'vuex':'Vuex',
      // 'element-ui': 'ELEMENT',
      // 'echarts': 'echarts'
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: '0.0.0.0',
    port: 8080,
    // 端口号
    https: false,
    // https:{type:Boolean}
    open: false,
    // 配置自动启动浏览器
    hotOnly: true,
    // 热更新
    proxy: { // 配置多个跨域
      '/': {
        target: 'http://120.220.43.80:83',
        changeOrigin: true, // 是否跨域 开启代理：在本地创建一个虚拟服务器
        ws: true, // 是否代理websockets
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
