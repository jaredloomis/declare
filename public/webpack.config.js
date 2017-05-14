/* global __dirname, require, module */
const webpack              = require("webpack")
const path                 = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
    entry: {
//        vendor: path.join(__dirname, "js", "Vendor.js"),
        app:    path.join(__dirname, "js", "Main.js")
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist", "js"),
        publicPath: "/js/",
        pathinfo: true
    },
    module: {
        rules: [
            // ESLint for all .js files
            {enforce: "pre", test: /\.js$/, exclude: /node_modules/,
             loader: "eslint-loader"},
            {test: /\.js$/, exclude: /node_modules/,
             loader: "babel-loader"},
            // TypeScript for .ts files
            {test: /\.ts$/, loader: "ts-loader"},
            // Load .scss files
            {test: /\.scss$/,
             use: ["style-loader", "css-loader", "sass-loader"]},
            // Load .html files
            {test: /\.html$/, loader: "html-loader"},
            // Load static files
            {test: /\.(png|jpg|gif|svg|mp4|json|ttf|woff|woff2|eot)$/,
             loader: "file-loader"}
        ]
    },
    resolve: {
        alias: {
            // Use the standalone version of Vue
            "vue$": "vue/dist/vue.common.js"
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: (module, count) => {
                const userRequest = module.userRequest
                return userRequest &&
                       userRequest.indexOf("node_modules") >= 0
            }
        }),
        /*
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),*/
        //new BundleAnalyzerPlugin()
    ]
}
