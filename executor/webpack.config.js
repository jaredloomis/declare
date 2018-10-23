/* global __dirname, require, module, process */
const webpack              = require("webpack")
const fs                   = require("fs")
const path                 = require("path")
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const plugins = []

// Add common chunk plugin
/*
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: "common.js",
    minChunks: (module, count) => {
        const userRequest = module.userRequest
        return userRequest &&
               userRequest.indexOf("node_modules") >= 0
    }
}))*/

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


const nodeModules = {}
fs.readdirSync("node_modules")
    .filter(x => [".bin"].indexOf(x) === -1)
    .forEach(mod => {
        nodeModules[mod] = "commonjs " + mod
    })

module.exports = {
    target: "node",
    entry: {
        bundle: path.join(__dirname, "src", "index.js")
    },
    output: {
        filename:   "executor.bundle.js",
        path:       path.join(__dirname, "dist"),
        publicPath: "/src/",
        pathinfo:   true,
        library: "executor"
    },
    module: {
        rules: [
            // ESLint for all .js files
            {enforce: "pre", test: /\.js$/, exclude: /node_modules/,
             loader: "eslint-loader"},
            // Babel for all .js files
            {test: /\.js$/, exclude: /node_modules/,
             loader: "babel-loader"},
            // Load static files
            {test: /\.(png|jpg|gif|svg|mp4|json|ttf|woff|woff2|eot)$/,
             loader: "file-loader"},
        ]
    },
    externals: nodeModules,
    plugins
}
