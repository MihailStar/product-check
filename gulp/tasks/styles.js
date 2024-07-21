/* eslint-disable import/no-extraneous-dependencies */

import autoprefixer from 'autoprefixer';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import postcss100vhFix from 'postcss-100vh-fix';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';
import postcssMediaMinmax from 'postcss-media-minmax';
import * as dartSass from 'sass';
import { isDevelopment, paths } from '../configuration.js';
import { server } from './server.js';

const sass = gulpSass(dartSass);

function compileStyles() {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      gulpIf(
        isDevelopment,
        postcss([
          postcssImport(),
          postcss100vhFix(),
          postcssMediaMinmax(),
          autoprefixer(),
        ]),
        postcss([
          postcssImport(),
          postcss100vhFix(),
          postcssMediaMinmax(),
          autoprefixer(),
          postcssCsso({ comments: false }),
        ]),
      ),
    )
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment, size({ title: 'compileStyles' })))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulpIf(isDevelopment, server.stream()));
}

export { compileStyles };
