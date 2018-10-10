const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")

const del    = require("del")

/* Building source code files */

function appJs() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
}

function lintAppJs() {
    return gulp.src(["src/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
}

const javascript = gulp.series(appJs)

/* Utils */

function watch() {
    return gulp.watch("src/**/*.js", javascript)
}

function clean() {
    return del(["dist"])
}

/* Entire build */

const build = gulp.series(clean, appJs)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintAppJs
exports.watch      = watch
exports.clean      = clean
