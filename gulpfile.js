/*eslint-env node*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine-phantom');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache'); //Optimize images while not repeat unless necessary
const pngquant = require('imagemin-pngquant'); //lossy settings
const mozjpeg = require('imagemin-mozjpeg'); //jpg very light lossy, use vs jpegtran, which is lossless

gulp.task('lint', () => {
    return gulp.src(['js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('styles', function() {
	return gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
		.pipe(sass({
            outputStyle: 'compressed' // perform minification on css files
        }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// run unit tests
gulp.task('tests', function() {
    return gulp.src('tests/spec/extraSpec.js')
        .pipe(jasmine({
            integration: true, // false only if you test node.js code
            vendor: 'js/**/*.js',
            keepRunner: './'
        }));
})

// copy the images to dist folder
gulp.task('copy-img', function() {
    return gulp.src('img/*')
        .pipe(cache(imagemin(
            [pngquant(), mozjpeg(), imagemin.jpegtran()]
        )))
        .pipe(gulp.dest('dist/img'))
})

// copy the index file to dist folder
gulp.task('copy-index', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
})

// to concatenate js files into one
gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel()) //JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript 
        .pipe(concat('all.js')) // set up name for the concatenation js file
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
})

// perform minification on js file via uglify
gulp.task('scripts-dist', function() {
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel()) //JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript 
        .pipe(concat('all.js')) // set up name for the concatenation js file
        .pipe(uglify()) // perform js minificaction, only add to this because it takes a long time 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('default', gulp.series(gulp.parallel('styles', 'copy-index', 'copy-img', 'scripts'), gulp.parallel('lint', 'tests'), function() {
    // This will only run if the lint task is successful...
    browserSync.init({
     server: "./dist"
    });
    gulp.watch('sass/**/*.scss', gulp.series('styles'));
    gulp.watch('index.html').on('change', gulp.series('copy-index'));
    gulp.watch('dist/index.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', gulp.series('scripts'));
    gulp.watch('dist/js/all.js').on('change', browserSync.reload);
}));

gulp.task('dist', gulp.series('copy-index', 'copy-img', 'styles', 'lint', 'scripts-dist'));

//type 'gulp' or 'gulp defaultP' in cmd line