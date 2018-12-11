/* global __dirname, require, module, process */
const webpack              = require("webpack")
const path                 = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const plugins = []

const isProduction = process.env.NODE_ENV === "production"

plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
    )
}))

// Analyze the bundle after building
//plugins.push(new BundleAnalyzerPlugin())

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        app: path.join(__dirname, "js", "Main.js")
    },
    output: {
        filename:   "[name].js",
        path:       path.join(__dirname, "dist", "js"),
        publicPath: "/js/",
        pathinfo:   true
    },
    module: {
        rules: [
            // ESLint for all .js files
            {enforce: "pre", test: /\.js$/, exclude: /node_modules/,
             loader: "eslint-loader"},
            // Babel for all .js files
            {test: /\.js$/, exclude: /node_modules/,
             loader: "babel-loader"},
            // Load .scss files, simulate CSS Modules
            {test: /\.scss$/,
             use: [
                 "style-loader",
                 {loader: "css-loader", options: {
                     modules: true,
                     localIdentName: "[name]_[local]_[hash:base64:5]"
                 }},
                 "sass-loader"
             ]},
            // Load .css files normally
            {test: /\.css$/,
             use: ["style-loader", "css-loader"]
            },
            // Load .html files
            {test: /\.html$/, loader: "html-loader"},
            // Load .graphql files with graphql-tag
            {test: /\.(graphql|gql)$/, exclude: /node_modules/,
             loader: "graphql-tag/loader"},
            // Load static files
            {test: /\.(png|jpg|gif|svg|mp4|json|ttf|woff|woff2|eot)$/,
             loader: "file-loader"},
        ]
    },
    optimization: {
        minimize: isProduction,
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins
}
