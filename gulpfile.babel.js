//HTML
import htmlmin from 'gulp-htmlmin'

//CSS
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import clean from 'gulp-purgecss'

// Javascript
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

//PUG
import pug from 'gulp-pug'

//SASS
import sass from 'gulp-sass'

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
        .src('src/css/*.css')           //origen del codigo CSS que se desea convertir
        .pipe(concat('styles.css')) //Une todos los archivos CSS en uno solo
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css')) //resultado del codigo CSS convertido 
})

//configuracion de la tarea babel que permite convertir codigo JS es10 u 11 o mas a codigo JS es5 que es el codigo JS compatible con todos los navegadores
gulp.task('babel', () => {
    return gulp
        .src('src/js/*.js')             //origen del codigo JS que se desea convertir
        .pipe(concat('scripts.js'))     //Une todos los archivos js en uno solo
        .pipe(babel())                  //permite hacer la conversion
        .pipe(terser())                 //sirve para ofuscar y minificar el codigo
        .pipe(gulp.dest('./public/js')) //resultado del codigo JS convertido a es5
})

//configuracion de la tarea pug que permite convertir desde PUG hacia HTML
gulp.task('pug', ()=>{
    return gulp
    .src('src/views/pages/*.pug')   //origen del codigo PUG que se desea convertir
    .pipe(pug({                     //permite hacer la conversion
        pretty: true 
    }))
    .pipe(gulp.dest('./src'))       //resultado del codigo PUG convertido a HTML
})

//configuracion de la tarea sass que permite convertir desde sass hacia codigo CSS
gulp.task('sass', ()=>{
    return gulp
    .src('src/scss/styles.scss')    //origen del codigo SASS que se desea convertir
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))   //resultado del codigo SASS convertido a CSS
})

// configuracion de una tarea adicional (opcional) que permite limpiar el codigo CSS que no se esta utilizando dentro de la pagina web (muy util cuando se utilizan franeworks como Bootstrap)
gulp.task('clean', ()=>{
    return gulp
    .src('public/css/styles.css')                 //CSS que deseamos limpiar
    .pipe(clean({content: ['./public/*.html'] })) //observa si se esta utilizando CSS en estos archivos HTML o no
    .pipe(gulp.dest('./public/css'))              //resultado de limpiar el codigo CSS
})

//tarea por defecto ue permite escuchar los cambios de la carpeta actual
gulp.task('default', ()=>{
    gulp.watch('src/views/**/*.pug', gulp.series('pug'))
    gulp.watch('src/*.html', gulp.series('htmlmin'))
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('src/css/*.css', gulp.series('styles'))
    gulp.watch('src/js/*.js', gulp.series('babel'))
})