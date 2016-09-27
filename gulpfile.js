var gulp            = require('gulp');
var pug             = require('gulp-pug');
var sass            = require("gulp-sass");
var watch           = require("gulp-watch");
var concat          = require("gulp-concat");
var uglify          = require('gulp-uglify');
var plumber         = require('gulp-plumber');
var cssnano         = require('gulp-cssnano');
var bowerFiles      = require("main-bower-files");
var browserSync     = require('browser-sync');
var autoprefixer    = require("gulp-autoprefixer");
var angularFileSort = require("gulp-angular-filesort");

var srcPaths = {
  'js':       'src/js/**/*.js',
  'pug':      'src/views/*.pug',
  'pugIndex': 'src/index.pug',
  'css':      'src/style/**/*.sass',
  'mainSass': 'src/style/viewpoint.sass'
};

var vendorPaths = {
  'css': 'vendor/bower/**/*.css',
  'js': 'vendor/bower/**/*.js'
}

var buildPaths = {
  'build': 'dist/',
  'pug':   'dist/views/'
};

var autoprefixerOptions = {
  browsers: [
      '> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 8',
      'IE 9',
      'IE 10',
      'IE 11'
  ],
  cascade: false
};

gulp.task('css', function() {
  gulp.src(srcPaths.mainSass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.build));
});

gulp.task('vendorCss', function() {
  gulp.src(bowerFiles("**/*.css"))
    .pipe(plumber())
    .pipe(concat("viewpoint-vendor.css"))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssnano())
    .pipe(gulp.dest(buildPaths.build));
});

gulp.task("js", function () {
  gulp.src(srcPaths.js)
    .pipe(plumber())
    .pipe(angularFileSort())
    .pipe(concat("viewpoint.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(buildPaths.build));
});

gulp.task("vendorJs", function () {
  gulp.src(bowerFiles("**/*.js"))
    .pipe(plumber())
    .pipe(concat("viewpoint-vendor.min.js"))
    .pipe(gulp.dest(buildPaths.build));
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
  watch(srcPaths.js, function () {
    gulp.start("js");
  });

  watch(srcPaths.css, function () {
    gulp.start("css");
  });

  watch(srcPaths.pug, function () {
    gulp.start("pug");
  });

  watch(srcPaths.pugIndex, function () {
    gulp.start("pugIndex");
  });

  watch(vendorPaths.css, function () {
    gulp.start("vendorCss");
  });

  watch(vendorPaths.js, function () {
    gulp.start("vendorJs");
  });
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

gulp.task('default', ['css', 'js', 'pug', 'pugIndex', 'vendorCss', 'vendorJs', 'watch', 'browser-sync']);
