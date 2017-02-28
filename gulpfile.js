const path = require("path")

const gulp = require("gulp")

const babel = require("gulp-babel")
//const closure = require("google-closure-compiler-js").gulp()
const eslint = require("gulp-eslint")
const mocha = require("gulp-mocha")

const ts = require("gulp-typescript")

const psc = require("gulp-purescript").psc

const del = require("del")

gulp.task(
    "default",
    ["typescript", "lint-js", "javascript"],
    function() {}
)

gulp.task("test", () => 
    gulp.src("app/tests/*.js")
    .pipe(mocha())
)

gulp.task("watch", () =>
    gulp.watch(path.join(__dirname, "app"), ["default"])
)

gulp.task("clean", () =>
    del(["dist"])
)

gulp.task("javascript", () => {
    gulp.src("app/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/app"))
})

gulp.task("typescript", () =>
    /*
    tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist/app"))
    */
    gulp.src("app/**/*.ts")
    .pipe(ts({}))
    .pipe(babel())
    .pipe(gulp.dest("dist/app"))
)

gulp.task("purescript", () =>
    psc({src: "app/**/*.purs"})
    .pipe(gulp.dest("dest/app"))
)

gulp.task("lint-js", () =>
    gulp.src(["app/**/*.js"])
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
)
