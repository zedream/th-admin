module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  chainWebpack: (config) => {
    const oneOfMap = config.module.rule('scss').oneOfs.store
    oneOfMap.forEach(item => {
      item
        .use('sass-resource-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/scss/common.scss', './src/assets/scss/iconfont.scss', './src/assets/font/index.scss']
        })
        .end()
    })
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'THao'
        return args
      })
  }
}
