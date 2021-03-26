var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
	entry: {
		// benchmark: "./src/benchmark.tsx",
		'render-props': "./src/render-props.tsx",
	},
	output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-chunk.js',
  },
	module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
	resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	plugins: [new HtmlWebpackPlugin({
		template: path.join(__dirname, 'index.html')
	})],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1234,
  },
};
