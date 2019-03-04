const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: "./client/bootstrap.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "./client/bootstrap.js",
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'                    
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}