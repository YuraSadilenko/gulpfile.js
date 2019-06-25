var gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename");
	autoprefixer = require("gulp-autoprefixer");
	imagemin = require('gulp-imagemin');
	uglify = require('gulp-uglify');
	pipeline = require('readable-stream').pipeline;
	cleanCSS = require('gulp-clean-css');
 
	gulp.task('uglify', function () {
  return pipeline(
    gulp.src('src/php/script/*.js'),
    uglify(),
    gulp.dest('dist/php/script')
  	);
	});

	gulp.task('minify-css', () => {
		return gulp.src('src/php/css/*.css')
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('dist/php/css'));
	});

gulp.task("sass", function() {
  gulp
    .src("src/php/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename("style.css"))
    .pipe(
      autoprefixer({
        browsers: ["last 20 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("src/php/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["sass", "browser"], function() {
	gulp.watch("src/php/sass/**/*.scss", ["sass"]);
	gulp.watch("src/index.html", browserSync.reload);
});

gulp.task("browser", function() {
	browserSync({
		server: { baseDir: "src" },
		notify: false
	});
});

gulp.task("build", function() {
	gulp.src(["src/php/css/*.css"]).pipe(gulp.dest("dist/php/css"));
	gulp.src(["src/php/bootstrap/css/*.css"]).pipe(gulp.dest("dist/php/bootstrap/css"));
	gulp.src(["src/php/bootstrap/jquery/*.js"]).pipe(gulp.dest("dist/php/bootstrap/jquery"));
	gulp.src(["src/php/bootstrap/js/*.js"]).pipe(gulp.dest("dist/php/bootstrap/js"));
	gulp.src(["src/php/css/*.*"]).pipe(gulp.dest("dist/php/css"));
	gulp.src(["src/php/script/*.*"]).pipe(gulp.dest("dist/php/script"));
	gulp.src(["src/php/img/*.*"]).pipe(gulp.dest("dist/php/img"));
	gulp.src(["src/php/img/svg/*.*"]).pipe(gulp.dest("dist/php/img/svg"));
	gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task('compress', function() {
  gulp.src('src/php/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/php/img'))
});