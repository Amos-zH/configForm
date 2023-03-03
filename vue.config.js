const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// 是否为生产环境
const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV)
console.log('isProduction: ', isProduction)

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: isProduction ? '/' : '/',
  chainWebpack: (config) => {
  },
  configureWebpack: config => {
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
    // 当出现编译器错误或警告时，在浏览器中显示
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
})
