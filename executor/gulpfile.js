const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")

const del    = require("del")

/* Building source code files */

function executorJs() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
}

function lintExecutorJs() {
    return gulp.src("src/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
}

const javascript = executorJs

/* Utils */

function watch() {
    return gulp.watch("src/**/*.js", javascript)
}

function clean() {
    return del(["dist"])
}

/* Entire build */

const build = gulp.series(clean, executorJs)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintExecutorJs
exports.watch      = watch
exports.clean      = clean
