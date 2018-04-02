module.exports = {
  /*
  ** Headers of the page
  */
	router: {
		linkActiveClass: 'active'
	},
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
      { src: '~/assets/sass/main.sass', lang: 'sass' },
  ],
  /*
  ** Add axios globally
  */
  build: {
    extractCSS: true,
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      /*if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }*/
    }
  }
}
