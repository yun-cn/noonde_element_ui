const pkg = require('./package');
const { resolve } = require('path');

module.exports = {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.5.0/css/all.css'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css'},
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js' },
    ]
  },

  loading: { color: '#fff' },

  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/common.styl',
    '@/assets/css/app.styl',
    '@/assets/css/main.css',
    // { src: '@/assets/css/mixin.scss', lang: 'scss' },
    // { src: '@/assets/css/btn.scss', lang: 'scss' },
    // { src: '@/assets/css/variables.scss', lang: 'scss'},
  ],

  plugins: [
    '@/plugins/i18n',
    '@/plugins/element-ui',
    '@/plugins/components',
    '@/plugins/vue-lazyload',
    '@/plugins/vue-scrollto',
    { src: "@/plugins/vue-gallery.js", ssr: false },
    { src: "@/plugins/google-map.js", ssr: false },
    { src: "@/plugins/persistedstate.js", ssr: false },
  ],
  styleResources: {
    stylus: '@/assets/css/funcs.styl'
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    ['nuxt-env', { keys: ['BASE_URL', 'WS_URL', 'DEBUG'] }],
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8080',
  },

  build: {
    cssSourceMap: false,

    extractCSS: true,

    transpile: [/^element-ui/],

    extend(config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
      svgRule.exclude = [resolve(__dirname, 'assets/svg')];

      config.module.rules.push({
        test: /\.svg$/,
        include: [resolve(__dirname, 'assets/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      });
    }
  }
};
