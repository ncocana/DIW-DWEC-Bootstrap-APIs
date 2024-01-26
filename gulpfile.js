const { series, src, dest, watch } = require('gulp');
const CLEAN_CSS = require('gulp-clean-css');
const CLEAN_JS = require('gulp-uglify');
const SCSS = require('gulp-sass')(require('sass'));
const CONCAT_CSS = require('gulp-concat-css');
const CONCAT_JS = require('gulp-concat-js');

// 1. Compilar los archivos .scss de la carpeta "scss" y meterlos en una carpeta llamada "css".
function scss() {
    return src('./src/scss/*.scss')
            .pipe(SCSS())
            .pipe(dest('./src/css/'));
}

// 2. Crea un watcher que vigile que cuando hay un cambio en un archivo .scss de todo el proyecto se llame a la tarea "scss".
function scss_watch() {
    watch('./src/scss/partials/*.scss', scss) && watch('./src/scss/*.scss', scss);
}

// 3. Minimiza los archivos de la carpeta .css y déjalos en la carpeta "dist/css". Prerrequisito: tarea "scss".
function minimizacss() {
    return src("./src/css/*.css")
            .pipe(CLEAN_CSS())
            .pipe(dest('./dist/css'));
}

// 4. Minimiza los archivos de la carpeta "js" y déjalos en "dist/js".
function minimizajs() {
    return src("./src/js/*.js")
            .pipe(CLEAN_JS())
            .pipe(dest('./dist/js/'));
}

// 5. Concatena todos los archivos de la carpeta "dist/css" en ORDEN
// y crea un archivo "all.css" en "dist/css/all.css". Prerrequisito: "minimizacss".
function concatcss() {
    return src("./dist/css/*.css")
            .pipe(CONCAT_CSS('./all.css'))
            .pipe(CLEAN_CSS())
            .pipe(dest('./dist/css/'));
}

// 6. Concatena todos los archivos de la carpeta "dist/js" en ORDEN
// y crea un archivo "all.js" en "dist/js/all.js". Prerrequisito: "minimizajs".
function concatjs() {
    return src("./dist/js/*.js")
            .pipe(CONCAT_JS({
                "target": "all.js",
                "entry": "./dist/js/application.js"
            }))
            .pipe(CLEAN_JS())
            .pipe(dest('./dist/js/'));
}

// 7. Crea una tarea "kittens" que ejecute todas las tareas (excepto los watchers);
// es decir, ejecutando la tarea "kittens" debería dejarse preparado el proyecto para subir a producción.

exports.scss = scss;
exports.scss_watch = scss_watch;
exports.cleancss = minimizacss;
exports.cleanjs = minimizajs;
exports.concatcss = concatcss;
exports.concatjs = concatjs;
exports.build = series(scss, minimizacss, minimizajs, concatcss, concatjs);
