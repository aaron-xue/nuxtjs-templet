module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
      var cdnImgUrl = 'https://static.shenzhoubb.com/images'
      if (ctx.isDev) {
        cdnImgUrl = '/assets/images'
      }
      config.module.rules.push({
        test: /\.(js|vue|css|scss)$/,
        loader: 'webpack-replace-loader',
        options: {
          arr: [
            { search: 'cdnImgUrl', replace: cdnImgUrl, attr: 'g' },
            { search: '.png', replace: '.png?v=' + new Date().getTime(), attr: 'g' },
            { search: '.jpg', replace: '.jpg?v=' + new Date().getTime(), attr: 'g' }
          ]
        }
      })
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api': {
      target: 'https://www.jianshu.com', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      }
    }
  },
  // server: {
  //   port: 3000, // default: 3000
  //   host: '192.168.110.233', // default: localhost,
  // },
  router: {
    middleware: 'changeTerminal'
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
