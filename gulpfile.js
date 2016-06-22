'use strict';

const os = require('os');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const coveralls = require('gulp-coveralls');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

if (!('COVERALLS_SERVICE_NAME' in process.env)) {
  process.env.COVERALLS_SERVICE_NAME = `${os.hostname()}.${os.platform()}-${os.release()}`;
}
process.env.COVERALLS_REPO_TOKEN = 'eyJVXus0Edofd2JMr7SJZeWlxLx6ZhRco';

const filesToLint = [
  'gulpfile.js',
  'lib/**/*.js',
  '!lib/config/**',
  '!node_modules/**'
];

gulp.task('lint', () => gulp.src(filesToLint)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('coverage', () => gulp
  .src(['!node_modules/**', '!lib/config/**', 'lib/**/*.js'])
  .pipe(istanbul({ includeUntested: true }))
  .pipe(istanbul.hookRequire()));

gulp.task('test:backend', () => gulp.src(['test/**/*.js'])
  .pipe(mocha({ reporter: 'spec' }))
  .once('error', err => {
    throw err;
  })
  .pipe(istanbul.writeReports({
    dir: './coverage',
    reporters: ['html', 'lcov', 'text', 'json']
  })));

gulp.task('coveralls', () => gulp.src('coverage/lcov.info').pipe(coveralls()));

gulp.task('test', callback => {
  runSequence('lint', 'coverage', 'test:backend', callback);
});
