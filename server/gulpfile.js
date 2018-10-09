const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")

const del    = require("del")

/* Building source code files */

function appJs() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/app"))
}

function lintAppJs() {
    return gulp.src(["src/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
}

function commonJs() {
    return gulp.src("../common/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/common"))
}

const javascript = gulp.series(appJs, commonJs)

/* Utils */

function watch() {
    return gulp.watch("src/**/*.js", javascript)
}

function clean() {
    return del(["dist"])
}

/* Entire build */

const build = gulp.series(clean, appJs, commonJs)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintAppJs
exports.watch      = watch
exports.clean      = clean
