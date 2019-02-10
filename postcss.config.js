module.exports = {
  plugins: [
    require('autoprefixer')({
			browsers: ['> 1%', 'last 3 version', 'iOS >= 8']
		}),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          }
        }
      ]
    })
  ]
}