import gulp from "gulp";
import fileInclude from "gulp-file-include";
import gulpSass from "gulp-sass";
import * as sass from "sass";
const scss = gulpSass(sass);
import autoprefixer from "gulp-autoprefixer";
import browserSyncLib from "browser-sync";
const browserSync = browserSyncLib.create();
import clean from "gulp-clean";
import fs from "fs";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import changed from "gulp-changed";
import postcss from "gulp-postcss";
import pxtorem from "postcss-pxtorem";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "./webpack.config.js";

const fileIncludeSettings = {
  prefix: "@@",
  basepath: "@file",
};

gulp.task("js:docs", function (done) {
  gulp
    .src("./src/js/**/*.js")
    .pipe(plumber(plumberConfig("JS")))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest("./docs/js"))
    .on("end", function () {
      browserSync.reload();
      done();
    });
});

const plumberConfig = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

gulp.task("html:docs", function () {
  return gulp
    .src("./src/pages/**/*.html")
    .pipe(plumber(plumberConfig("HTML")))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(gulp.dest("./docs/"))
    .pipe(browserSync.stream());
});

gulp.task("components:docs", function () {
  return gulp
    .src("./src/components/**/*.html")
    .pipe(plumber(plumberConfig("components")))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(gulp.dest("./docs/components/"))
    .pipe(browserSync.stream());
});

gulp.task("scss:docs", function () {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(plumber(plumberConfig("STYLES")))
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(
      postcss([
        pxtorem({
          rootValue: 16,
          propList: ["*"],
          replace: true,
        }),
      ]),
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./docs/css/"))
    .pipe(browserSync.stream());
});

gulp.task("images:docs", function () {
  return gulp
    .src("./src/img/**/*.{png,jpg,jpeg,gif,svg}")
    .pipe(changed("./docs/img/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./docs/img/"))
    .pipe(browserSync.stream());
});
gulp.task("fonts:docs", function () {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./docs/fonts/")).pipe(browserSync.stream());
});

gulp.task("clean:docs", function (done) {
  if (fs.existsSync("./docs/")) {
    return gulp.src("./docs/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task("server:docs", function () {
  browserSync.init({
    server: {
      baseDir: "./docs",
      index: "index.html",
    },
    port: 8080,
    open: true,
  });
});

gulp.task("watch:docs", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.series("scss:docs"));
  gulp.watch("./src/components", gulp.series("components:docs"));
  gulp.watch("./src/**/*.html", gulp.series("html:docs"));
  gulp.watch("./src/img/**/*", gulp.series("images:docs"));
  gulp.watch("./src/js/**/*.js", gulp.series("js:docs"));
  gulp.watch("./src/fonts/**/*", gulp.series("fonts:docs"));
});

gulp.task(
  "default",
  gulp.series(
    "clean:docs",
    gulp.parallel(
      "html:docs",
      "scss:docs",
      "images:docs",
      "js:docs",
      "fonts:docs",
      "components:docs",
    ),
    gulp.parallel("server:docs", "watch:docs"),
  ),
);
