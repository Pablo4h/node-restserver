//============
//Puerto
//============

process.env.PORT = process.env.PORT || 3000;


//============
//Entorno
//============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//============
//Base de datos
//============

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe_user:yondaimehokage0@ds143330.mlab.com:43330/cafe_pruebas';
}

process.env.URLDB = urlDB;