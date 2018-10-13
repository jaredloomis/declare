const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")

const del    = require("del")

/* Building source code files */

function databaseJs() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
}

function lintDatabaseJs() {
    return gulp.src("src/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
}

const javascript = databaseJs

/* Utils */

function watch() {
    return gulp.watch("src/**/*.js", javascript)
}

function clean() {
    return del(["dist"])
}

/* Entire build */

const build = gulp.series(clean, databaseJs)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintDatabaseJs
exports.watch      = watch
exports.clean      = clean
