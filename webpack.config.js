module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: './distr/mulecore.js',
		library: 'mulecore',
		libraryTarget: 'umd'
	},

	module: {
	    rules: [
	      	{
	        	test: /\.js$/,
	        	exclude: /node_modules/,
	        	loader: "eslint-loader",
	        	options: {
	          		// eslint options (if necessary)
	        	}
	      	},
	    ],
	}

}