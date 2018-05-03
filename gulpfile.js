const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")
const mocha  = require("gulp-mocha")

const path   = require("path")
const del    = require("del")

/* Building source code files */

function javascript() {
    return gulp.src("app/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/app"))
}

function lintJs() {
    return gulp.src(["app/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

/* Utils */

function watch() {
    return gulp.watch("app/**/*.js", javascript)
}

function clean() {
    return del(["dist"])
}

/* Entire build */

const build = gulp.series(clean, javascript)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintJs
exports.watch      = watch
exports.clean      = clean
