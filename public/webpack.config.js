module.exports = {
    entry: "./js/Main.js",
    output: {
        filename: "bundle.js",
        path: "./dist/js"
    },
    module: {
        rules: [
            // ESLint for all .js files
            {enforce: "pre", test: /\.js$/,
             loader: "eslint-loader", exclude: /node_modules/},
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
    }
}
