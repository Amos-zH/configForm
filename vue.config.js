const packageName = require('./package.json').name
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// 是否为生产环境
const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV)
console.log('是否为生产环境: ', isProduction)

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: isProduction ? '/' : '/',
  chainWebpack: (config) => {
  },
  configureWebpack: config => {
    /**微前端打包配置START */
    config.output.library = `${packageName}-[name]`
    config.output.libraryTarget = 'umd'
    config.output.chunkLoadingGlobal = `webpackJsonp_${packageName}` // 官方文档里说的 jsonpFunction 在 webpack5 里已弃用，改为 chunkLoadingGlobal
    /**微前端打包配置END */
    if (isProduction) {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    // 开发生产共同配置
    Object.assign(config, {
      resolve: {
        // 可不写的扩展名,
        extensions: ['.js', '.vue', '.json'],
        // 添加别名
        alias: {
          '@': resolve('src'),
          '@image': resolve('src/assets/image'),
          '@components': resolve('src/components'),
          '@utils': resolve('src/utils'),
          '@plugins': resolve('src/plugins'),
          '@views': resolve('src/views'),
          '@store': resolve('src/store'),
          '@api': resolve('src/api'),
        },
      },
    })
  },
  devServer: {
    // 配置自动启动浏览器
    open: true,
    // 主机名
    host: 'localhost',
    // 端口号
    port: 3000,
    // 支持https，使用自签名证书
    https: false,
    // 模块热替换
    hot: 'only',
    historyApiFallback: true, // 当找不到页面时，会返回index.html
    // 当出现编译器错误或警告时，在浏览器中显示
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    allowedHosts: 'all',
    headers: {
      // 因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
      'Access-Control-Allow-Origin': '*'
    },
  },
})
