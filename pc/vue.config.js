
var package = require('../package.json');
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/base.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: package.proxyAddr,  // 本地调试接口域名
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api': ''   // 需要rewrite的,
        }
      }
    },
    port: 8080
  }
}
