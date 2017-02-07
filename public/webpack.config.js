const webpack = require("webpack")
const path    = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
    entry: {
        app: "./js/Main.js"
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
            {enforce: "pre", test: /\.js$/,
             loader: "eslint-loader", exclude: /node_modules/},
            // TypeScript for .ts files
            {test: /\.ts$/, loader: "ts-loader"},
            // Babel compile all .js files with latest preset
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            // Load .vue files
            {test: /\.vue$/, loader: "vue-loader"},
            // Load .html files
            {test: /\.html$/, loader: "html-loader"},
            // Load static files
            {test: /\.(png|jpg|gif|svg|mp4|json)$/, loader: "file-loader"}
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
            //minChunks: 2,
            minChunks: (module, count) => {
                const userReq = module.userRequest
                return userReq && userReq.indexOf("node_modules") >= 0
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new BundleAnalyzerPlugin()
    ]
}
