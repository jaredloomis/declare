const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")

/* Building source code files */

function commonJs() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
}

function lintCommonJs() {
    return gulp.src("src/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
}

const javascript = commonJs

/* Utils */

function watch() {
    return gulp.watch("src/**/*.js", javascript)
}

/* Entire build */

const build = gulp.series(commonJs)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintCommonJs
exports.watch      = watch