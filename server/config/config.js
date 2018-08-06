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
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;


//============
//Vencimiento del token
//============
//60 seg
//60 minut
//24 horas
//30 DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//sedd de autenticacion

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//Google Client ID

process.env.CLIENT_ID = process.env.CLIENT_ID || '253866389918-4qnghhnhfl2mmqf1c1olnpubd7aqui6n.apps.googleusercontent.com';