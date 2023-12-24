const gulp   = require("gulp")
const babel  = require("gulp-babel")
const eslint = require("gulp-eslint")

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

/* Entire build */

const build = gulp.series(executorJs)

gulp.task("default", build)
exports.build      = build
exports.javascript = javascript
exports.lintJs     = lintExecutorJs
exports.watch      = watch
