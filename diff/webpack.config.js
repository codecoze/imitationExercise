
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: 'development',
    // entry: {
    //     main: "./src/index.js",
    // },
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public") ,
        filename: "./js/[name].js",
        clean: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        compress: true,
        port: 8100,
        open: true,
        hot: true
         
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        //   {
        //     test: /\.m?js$/,
        //     exclude: /node_modules/,
        //     use: {
        //       loader: 'babel-loader'
        //     }
        //   }
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ],
    
}