const path = require('path');
const glob = require('glob');

function expose(list)
{
	var rules = [];
	for (var name in list)
	{
		rules.push({
			test: require.resolve('./src/' + list[name]),
			loader: 'expose-loader',
			options: {
				exposes: {
					globalName: name,
					override: true,
				}
			}
		});
	}
	return rules;
}

module.exports = {
	mode: 'development',

	entry: glob.sync('./src/**/*.ts').filter(file => !(/.+?\.d\.ts$/.test(file))),
	devtool: 'cheap-module-source-map',
	output: {
		filename: 'main.js',
		publicPath: './',
		path: path.resolve(__dirname, './bin')
	},
	module: {
		rules: [{
			test: require.resolve('./src/test.ts'),
			loader: 'expose-loader',
			options: {
				exposes: {
					globalName: "test",
					override: true,
				}
			}
		}, {
			test: /\.ts$/,
			loader: 'ts-loader'
		}]
	},
	resolve: {
		extensions: [
			'.ts'
		]
	},
	watchOptions: {
		aggregateTimeout: 500,
		poll: 1000,
		ignored: /node_modules/,
	},
};