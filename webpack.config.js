const path = require('path');

module.exports = {
    entry: './src/assets/dashboard.js',  // Entry point for your application
    output: {
        filename: 'bundle.js',            // Output filename
        path: path.resolve(__dirname, 'dist')  // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/,            // Apply Babel transpiling to JS files
                exclude: /node_modules/,  // Exclude node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']  // Transpile ES6+ to ES5
                    }
                }
            }
        ]
    },
    mode: 'development',               // Set Webpack mode to development
    devtool: 'source-map'              // Include source maps for easier debugging
};
