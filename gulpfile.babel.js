//HTML
import htmlmin from 'gulp-htmlmin'

//CSS
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

// Javascript
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

//common
import concat from 'gulp-concat'

//variables|constantes
const cssPlugins = [cssnano(), autoprefixer()]


//configuracion de la tarea html que permite convertir minificar y optimizar el codigo HTML que se subira al servidor 
gulp.task('htmlmin', () => {
    return gulp
        .src('src/*.html') //origen del codigo HTML que se desea convertir
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public')) //resultado del codigo HTML convertido
})


//configuracion de la tarea styles que permite convertir minificar y optimizar el codigo CSS que se subira al servidor para que sea compatible con cualquier servidor
gulp.task('styles', () => {
    return gulp
        .src('src/css/*.css') //origen del codigo CSS que se desea convertir
        .pipe(concat('styles-min.css')) //Une todos los archivos CSS en uno solo
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css')) //resultado del codigo CSS convertido 
})



//configuracion de la tarea babel que permite convertir codigo JS es10 u 11 o mas a codigo JS es5 que es el codigo JS compatible con todos los navegadores
gulp.task('babel', () => {
    return gulp
        .src('src/js/*.js') //origen del codigo JS que se desea convertir
        .pipe(concat('scripts-min.js')) //Une todos los archivos js en uno solo
        .pipe(babel()) //permite hacer la conversion
        .pipe(terser()) //sirve para ofuscar y minificar el codigo fina
        .pipe(gulp.dest('./public/js')) //resultado del codigo JS convertido a es5
})


//tarea por defecto ue permite escuchar los cambios de la carpeta actual
gulp.task('default', ()=>{
    gulp.watch('src/*.html', gulp.series('htmlmin'))
    gulp.watch('src/css/*.css', gulp.series('styles'))
    gulp.watch('src/js/*.js', gulp.series('babel'))
})