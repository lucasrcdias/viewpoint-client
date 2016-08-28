var gulp        = require('gulp');
var pug         = require('gulp-pug');
var fastylus    = require('fa-stylus');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');
var koutoSwiss  = require('kouto-swiss');
var plumber     = require('gulp-plumber');
var cssnano     = require('gulp-cssnano');
var browserSync = require('browser-sync');
var prefixer    = require('autoprefixer-stylus');

var srcPaths = {
  js:       'src/js/**/*.js',
  pug:      'src/views/*.pug',
  pugIndex: 'src/index.pug',
  css:      'src/stylus/**/*.styl',
  mainStyl: 'src/stylus/main.styl'
};

var buildPaths = {
  build: 'dist/',
  js:    'dist/js/',
  css:   'dist/css/',
  pug:   'dist/views/'
};

gulp.task('css', function() {
  gulp.src(srcPaths.mainStyl)
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), fastylus()],
      compress: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.css));
});

gulp.task('js', function() {
  gulp.src(srcPaths.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(buildPaths.js));
});

gulp.task('pug', function() {
  gulp.src(srcPaths.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPaths.pug));
});

gulp.task('pugIndex', function() {
  gulp.src(srcPaths.pugIndex)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildPaths.build));
});

gulp.task('watch', function() {
  gulp.watch(srcPaths.css,      ['css']);
  gulp.watch(srcPaths.js,       ['js']);
  gulp.watch(srcPaths.pug,      ['pug']);
  gulp.watch(srcPaths.pugIndex, ['pugIndex']);
});

gulp.task('browser-sync', function() {
  browserSync.init(buildPaths.build, {
    port: '9000',
    server: {
      baseDir: buildPaths.build,
      routes: {
        "/bower": "vendor/bower/"
      }
    },
    socket: {
      port: '9000',
      domain: 'localhost:9000'
    }
  });
});

gulp.task('default', ['css', 'js', 'pug', 'pugIndex', 'watch', 'browser-sync']);
