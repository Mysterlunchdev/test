/*
  Gulp file for creating one css file and one js file
  

*/


var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    // server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    stylus      = require('gulp-stylus'),
    notify      = require('gulp-notify'),
    uglify         = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    nodemon     = require('gulp-nodemon'),
    concatCss = require('gulp-concat-css'),
    jade = require('gulp-jade'),
    rename         = require('gulp-rename'),
    jshint      = require('gulp-jshint'),
    server2 = require('gulp-express'),
    apidoc = require('gulp-apidoc'),
    lrPort      = 35729;
    var gutil = require('gulp-util');
 
var paths = {
  styles: ['application/public/css/*.styl'],
 
  scripts: [
    'application/public/app/app.js','application/public/app/**/*.js','application/public/app/**/**/*.js','application/public/app/**/**/**/*.js','application/public/app/**/**/**/**/*.js'
  ],
  scriptsVendor: [
  // 'application/public/vendor/toastr/toastr.js',
  // 'application/public/vendor/angular/angular.js',
  // 'application/public/vendor/angular-resource/angular-resource.js',
  // 'application/public/vendor/angular-route/angular-route.js',
  // 'application/public/vendor/bootstrap/dist/js/bootstrap.js',
  // 'application/public/vendor/ngImgCrop/compile/unminified/ng-img-crop.js',
 ],
  css: [
    // 'application/public/vendor/toastr/toastr.css',
    // "application/public/vendor/ngDialog/css/ngDialog.css",
    // "application/public/vendor/ngDialog/css/ngDialog-theme-default.css",
    // 'application/public/vendor/ngImgCrop/compile/minified/ng-img-crop.css',
    // "application/public/vendor/angular-loading-bar/build/loading-bar.min.css",
    // "application/public/vendor/angular-tooltips/dist/angular-tooltips.min.css",
    // "application/public/vendor/guillotine-master/css/jquery.guillotine.css",
    // 'application/public/vendor/datetimepicker-master/jquery.datetimepicker.css'
  ],
  html: [
  'application/public/app/**/*.jade',
  ],
 
  server: {
    js: ['server.js']
  }
};
 

var gulpDocs = require('gulp-ngdocs');
gulp.task('apidoc', function(done){
    apidoc({
      src: "application/server/controller/",
      dest: "docs/api/"
      },done);
}); 
gulp.task('doc', function (cb) {
    var gulpDocs = require('gulp-ngdocs');
    var options = { 
      //options 
    }
    return gulpDocs.sections({
      api: {
        glob:paths.scripts,
        api: true,
        title: 'API Documentation'
      },
    }).pipe(gulpDocs.process(options)).on('error', function (error) {
        console.error('' + error);
    }).pipe(gulp.dest('./docs/angular'));
});
gulp.task('connect_ngdocs', function() {
var connect = require('gulp-connect');
  connect.server({
    root: 'docs/angular',
    livereload: true,
    fallback: 'docs/angular/index.html',
    port: 8084
  });
});
gulp.task('serve', function(){
  server2.run(['server.js'], {}, refresh(server2));
  gulp.watch(paths.html, function(event) {
    gulp.run('html');
    // refresh(server2);
    server2.notify(event);
  });
  gulp.watch(paths.scripts, function(event) {
    gulp.run('scripts');
  });
  gulp.watch(paths.styles, function(event) {
    gulp.run('stylus');
    server2.notify(event);
  });
  gulp.watch(['application/server/**/*.js', 'application/server/*.js', '*.js'], server2.run);
  gulp.watch(['application/server/**/*.js', 'application/server/*.js', '*.js'], server2.notify);
});
 
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

gulp.task('jade', function () {
  return gulp.src(paths.html)
    .pipe(jade())
    .pipe(gulp.dest('application/public/app/'))
})
 
gulp.task('scripts', function(){
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('application/public/dist/min/'))
    // .(gulp.src('application/public/dist/min/grunt/test/app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest('application/public/dist/min/'))
    .pipe(refresh(server2))
    .pipe(server2.notify());
    // .pipe(notify({message: 'JS concated'}));
});
gulp.task('scriptsVendor', function(){
  gulp.src(paths.scriptsVendor)
    .pipe(plumber())
    .pipe(concat('app_vendor.js'))
    .pipe(gulp.dest('application/public/dist/min/'))
});
  
 
gulp.task('stylus', function(){
  return gulp.task('stylus', function() {
    gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('application/public/css/'))
    .pipe(refresh(server2));
    // .pipe(notify({message: 'stylus done'}));

  })
});
 


gulp.task('css', function(){
  return gulp.task('css', function() {

    gulp.src(paths.css)
      .pipe(concatCss('css_concat.css'))
      .pipe(gulp.dest('application/public/dist/min/css/'))
  })
});
 
gulp.task('html', function(){
  return gulp.task('html', function(){
    gulp.src(paths.html)
    .pipe(jade())
    .pipe(gulp.dest('application/public/app/'))
    .pipe(refresh(server2));
      // .pipe(notify({message: 'Views refreshed'}));
  });
});
 
gulp.task('build', ['stylus', 'scripts', 'css','doc', 'apidoc' ]);
 
// gulp.task('lr', function(){
//   server.listen(lrPort, function(err){
//     if(err) {return console.error(err);}
//   });
// });
 
gulp.task('watch', function(){
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['scripts', 'doc']);

  gulp.watch(paths.styles, ['stylus']);
  gulp.watch('application/server/controller/*.js', ['apidoc']);
});
 
gulp.task('default', ['connect_ngdocs', 'build', 'serve', 'jade', 'watch', 'doc', 'apidoc']);

