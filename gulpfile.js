const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const svgSprite = require('gulp-svg-sprites');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['connect','scripts', 'watch'], function () {

});

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./build/*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./src/styles/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(connect.reload())
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('sprite', function () {
  gulp.src('./src/assets/svg/*.svg')
    .pipe(svgmin({
        plugins: [
          {removeTitle: true},
          {
            removeAttrs: {attrs: 'opacity'}
          },
          {convertStyleToAttrs: true}
        ]
      }
    ))
    .pipe(svgSprite({mode: "symbols"}))
    .pipe(gulp.dest('./build/assets'));
})

gulp.task('scripts', function(){
  gulp.src(['./src/scripts/svg4everybody.js','./src/scripts/**/*.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./build/scripts/'))
})

gulp.task('watch', ['sass', 'html'], function () {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch(['./build/*.html'], ['html']);
});