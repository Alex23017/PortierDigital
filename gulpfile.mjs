// gulpfile.mjs
import gulp, { src, dest } from "gulp";
import fileInclude from "gulp-file-include";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import autoprefixer from "gulp-autoprefixer";
import browserSyncLib from "browser-sync";
import clean from "gulp-clean";
import fs from "fs";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin"; // версия 4.x
import postcss from "gulp-postcss";
import pxtorem from "postcss-pxtorem";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webp from "gulp-webp";
import merge from "merge-stream";
import mozjpeg from "imagemin-mozjpeg";
import optipng from "imagemin-optipng";
import svgo from "imagemin-svgo";
import webpackConfig from "./webpack.config.js";

const scss = gulpSass(sass);
const browserSync = browserSyncLib.create();

// ----------------------------------------
// Plumber Error Handler
// ----------------------------------------
const plumberConfig = (title) => ({
  errorHandler: notify.onError({
    title,
    message: "Error <%= error.message %>",
    sound: false,
  }),
});

// ----------------------------------------
// HTML
// ----------------------------------------
export const htmlDocs = () =>
  src("./src/pages/**/*.html")
    .pipe(plumber(plumberConfig("HTML")))
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest("./docs/"))
    .pipe(browserSync.stream());

// ----------------------------------------
// Components
// ----------------------------------------
export const componentsDocs = () =>
  src("./src/components/**/*.html")
    .pipe(plumber(plumberConfig("Components")))
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest("./docs/components/"))
    .pipe(browserSync.stream());

// ----------------------------------------
// SCSS
// ----------------------------------------
export const scssDocs = () =>
  src("./src/scss/**/*.scss")
    .pipe(plumber(plumberConfig("STYLES")))
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(postcss([pxtorem({ rootValue: 16, propList: ["*"], replace: true })]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(dest("./docs/css/"))
    .pipe(browserSync.stream());

// ----------------------------------------
// JS
// ----------------------------------------
export const jsDocs = (done) => {
  src("./src/js/**/*.js")
    .pipe(plumber(plumberConfig("JS")))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest("./docs/js"))
    .on("end", () => {
      browserSync.reload();
      done();
    });
};

// ----------------------------------------
// Images (gulp-imagemin v4 + WebP)
// ----------------------------------------
export const imagesDocs = () => {
  const optimized = src("./src/img/**/*.*", { encoding: false })
    .pipe(
      imagemin([
        mozjpeg({ progressive: true, quality: 75 }),
        optipng({ optimizationLevel: 5 }),
        svgo({ plugins: [{ name: "removeViewBox", active: false }] }),
      ])
    )
    .pipe(dest("./docs/img/"));

  const webpImages = src("./src/img/**/*.{png,jpg,jpeg}", { encoding: false })
    .pipe(webp({ quality: 70 }))
    .pipe(dest("./docs/img/"));

  return merge(optimized, webpImages).on("end", () => browserSync.reload());
};

// ----------------------------------------
// Fonts
// ----------------------------------------
export const fontsDocs = () =>
  src("./src/fonts/**/*")
    .pipe(dest("./docs/fonts/"))
    .pipe(browserSync.stream());

// ----------------------------------------
// Clean
// ----------------------------------------
export const cleanDocs = (done) => {
  if (fs.existsSync("./docs/")) {
    return src("./docs/", { read: false }).pipe(clean({ force: true }));
  }
  done();
};

// ----------------------------------------
// Server
// ----------------------------------------
export const serverDocs = () =>
  browserSync.init({
    server: { baseDir: "./docs", index: "index.html" },
    port: 8080,
    open: true,
  });

// ----------------------------------------
// Watch
// ----------------------------------------
export const watchDocs = () => {
  gulp.watch("./src/scss/**/*.scss", scssDocs);
  gulp.watch("./src/components/**/*.html", componentsDocs);
  gulp.watch("./src/pages/**/*.html", htmlDocs);
  gulp.watch("./src/img/**/*.{png,jpg,jpeg,gif,svg}", imagesDocs);
  gulp.watch("./src/js/**/*.js", jsDocs);
  gulp.watch("./src/fonts/**/*", fontsDocs);
};

// ----------------------------------------
// Default
// ----------------------------------------
export default gulp.series(
  cleanDocs,
  gulp.parallel(htmlDocs, scssDocs, imagesDocs, jsDocs, fontsDocs, componentsDocs),
  gulp.parallel(serverDocs, watchDocs)
);
