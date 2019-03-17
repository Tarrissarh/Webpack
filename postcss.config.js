const postcss = require('postcss-preset-env');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		postcss({
			browsers: ['last 2 versions'],
			autoprefixer: {
				add: true,
				flexbox: true,
				grid: 'autoplace'
			}
		}),
		cssnano,
		autoprefixer({
			browsers: ['last 2 version']
		}),
	]
};