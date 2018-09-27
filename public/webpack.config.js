/* global __dirname, require, module, process */
const webpack              = require("webpack")
const path                 = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const plugins = []

// Add common chunk plugin
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: "common.js",
    minChunks: (module, count) => {
        const userRequest = module.userRequest
        return userRequest &&
               userRequest.indexOf("node_modules") >= 0
    }
}))

// Add optimizations when in productions
if(process.env.NODE_ENV === "production") {
    // UglifyJS plugin
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }
    }))
    // Prepack plugin - TODO
    //new PrepackWebpackPlugin({})
}

// Analyze the bundle after building
//plugins.push(new BundleAnalyzerPlugin())

module.exports = {
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
            // TypeScript for .ts files
            {test: /\.ts$/, loader: "ts-loader"},
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
    resolve: {
        alias: {
            // Use the standalone version of Vue
            "vue$": "vue/dist/vue.common.js"
        }
    },
    plugins
}
