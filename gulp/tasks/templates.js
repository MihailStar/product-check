/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import htmlBeautify from 'gulp-html-beautify';
import gulpIf from 'gulp-if';
import pug from 'gulp-pug';
import size from 'gulp-size';
import {
  isDevelopment,
  isProductionMinimized,
  paths,
} from '../configuration.js';

function compileTemplates() {
  return gulp
    .src(paths.templates.src)
    .pipe(pug())
    .pipe(
      gulpIf(
        !isDevelopment && !isProductionMinimized.templates,
        htmlBeautify({ html: { indent_size: 2 } }),
      ),
    )
    .pipe(gulpIf(!isDevelopment, size({ title: 'compileTemplates' })))
    .pipe(gulp.dest(paths.templates.dest));
}

export { compileTemplates };
