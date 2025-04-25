const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js');
const packageJson = require('../package.json');

const devConfig = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		port: 8080,
		historyApiFallback: {
			index: '/index.html',
		},
		hot: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: 'marketing@http://localhost:8081/remoteEntry.js',
			},
			shared: packageJson.dependencies,
		}),
	],
	output: {
		publicPath: 'auto',
	},
};

module.exports = merge(commonConfig, devConfig);
