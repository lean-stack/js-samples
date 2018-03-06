
// Gulp
const gulp = require('gulp');

// Plugins
const sass   = require('gulp-sass');
const babel  = require('gulp-babel');
const inject = require('gulp-inject');

// Tools
const browser = require('browser-sync').create();

// Styles
gulp.task('styles', (done) => {
    gulp.src('./src/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
    
    browser.reload();
    done();
});

// Scripts
gulp.task('scripts', (done) => {
    gulp.src('./src/scripts/**/*.js')
        .pipe(babel({ 
            presets: [
                ['env', { modules: false }]
            ]
        }))
        .pipe(gulp.dest('./dist/js'));
    
    browser.reload();
    done();
});

// Injecting scripts and styles
gulp.task('html', (done) => {
    const files = gulp.src(['./dist/css/*.css', './dist/js/app.js'], {read: false});

    inject.transform.html.js = filepath => `<script type="module" src="${filepath}"></script>`;

    gulp.src('./src/index.html')
        .pipe(inject(files,{
            removeTags: true,
            ignorePath: 'dist',
            addRootSlash: false
        }))
        .pipe(gulp.dest('./dist'));
    
    browser.reload();
    done();
});

gulp.task('watch', (done) => {
    gulp.watch('./src/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('./src/scripts/**/*.js', gulp.series('scripts'));
    gulp.watch('./src/index.html', gulp.series('html'));
    done();
});

gulp.task('serve', (done) => {
    browser.init({
        proxy: {
            target: "http://localhost:8000",
            ws: true
        }
    });
    done();
});

gulp.task('default', gulp.series('styles', 'scripts', 'html'));
gulp.task('dev', gulp.series('default','watch','serve'));