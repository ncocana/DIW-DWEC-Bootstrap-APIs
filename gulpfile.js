const { series, parallel, src, dest, watch } = require('gulp');
const CLEAN_CSS = require('gulp-clean-css');
const CLEAN_JS = require('gulp-uglify');
const SCSS = require('gulp-sass')(require('sass'));
const CONCAT_CSS = require('gulp-concat-css');
const CONCAT_JS = require('gulp-concat');

// Compilar los archivos .scss de la carpeta "scss" y meterlos en una carpeta llamada "css".
function scss() {
    return src('./src/scss/*.scss')
            .pipe(SCSS())
            .pipe(dest('./src/css/'));
}

// Crea un watcher que vigile que cuando hay un cambio en un archivo .scss de todo el proyecto se llame a la tarea "scss".
function scss_watch() {
    watch('./src/scss/partials/*.scss', scss) && watch('./src/scss/*.scss', scss);
}

// Minimiza los archivos de la carpeta .css y déjalos en la carpeta "dist/css". Prerrequisito: tarea "scss".
function minimizacss() {
    return src("./src/css/*.css")
            .pipe(CLEAN_CSS())
            .pipe(dest('./dist/css'));
}

// Minimiza los archivos de la carpeta "js" y déjalos en "dist/js".
function minimizajs() {
    return src("./src/js/*.js")
            .pipe(CLEAN_JS())
            .pipe(dest('./dist/js/'));
}

// Concatena todos los archivos de la carpeta "dist/css" en ORDEN
// y crea un archivo "all.css" en "dist/css/all.css". Prerrequisito: "minimizacss".
function concatcss() {
    return src("./dist/css/*.css")
            .pipe(CONCAT_CSS('./all.css'))
            .pipe(CLEAN_CSS())
            .pipe(dest('./dist/css/'));
}

// Concatena todos los archivos de la carpeta "dist/js" en ORDEN
// y crea un archivo "all.js" en "dist/js/all.js". Prerrequisito: "minimizajs".
function concatjs() {
    return src([
        "./dist/js/initIndexedDB.js",
        "./dist/js/indexedDbCrud.js",
        "./dist/js/dragAndDrop.js"
    ])
    .pipe(CONCAT_JS('all.js')) // Concatenate files into all.js
    .pipe(dest('./dist/js/'));
}

// Mover imagenes y archivos HTML a "dist".
function moveFiles() {
    return src(['./src/**/*.jpg', './src/**/*.png', './src/**/*.webp', './src/**/*.svg', './src/**/*.html', '!./src/assets/original/**', '!./src/css/bootstrap*/**'])
            .pipe(dest('dist'));
};

// TAREAS

exports.scss = scss;
exports.scss_watch = scss_watch;
exports.cleancss = minimizacss;
exports.cleanjs = minimizajs;
exports.concatcss = concatcss;
exports.concatjs = concatjs;
exports.moveFiles = moveFiles;
exports.build = parallel(series(scss, minimizacss, concatcss), series(minimizajs, concatjs), moveFiles);
