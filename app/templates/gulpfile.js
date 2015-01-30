/*global -$ */
'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['templates', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'dist/*.jade',
    'dist/css/**/*.css',
    'dist/js/**/*.js',
    'dist/images/**/*'
  ]).on('change', reload);

  gulp.watch('app/scripts/**/*.coffee', ['scripts', reload]);
  gulp.watch('app/styles/**/*.styl', ['styles', reload]);
  gulp.watch('bower.json', ['wiredep', reload]);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/*.jade')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

//new tasks

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('templates', function () {
  gulp.src('app/**/*.jade')
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('templatesMin', ['styles', 'scripts'], function () {
  var assets = $.useref.assets({searchPath: ['dist']});

  gulp.src('app/**/*.jade')
    .pipe($.jade({pretty: true}))
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.styl')
    .pipe($.stylus({
      compress: true
    }))
    .pipe($.concat('main.css'))
    .pipe($.postcss([
      require('autoprefixer-core')({ browsers: ['> 2%']})
    ]))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
  gulp.src('app/scripts/**/*.coffee')
    .pipe($.coffee())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('fonts', function () {
  gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
  gulp.src('app/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', function () {
  gulp.src([
    'app/*.*',
    '!app/*.jade'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function () {
  gulp.start(['templatesMin', 'fonts', 'images']);

  gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
