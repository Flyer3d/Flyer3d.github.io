const { join } = require('path')

module.exports = {
  build: {
    vendor: ['vuetify', 'v-autocomplete']
  },
  plugins: [
    '~plugins/vuetify.js',
    '~plugins/v-autocomplete.js',
  ],
  css: [
    { src: join(__dirname, 'css/app.styl'), lang: 'styl' }
  ],
  head: {
    link: [
      { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
}
