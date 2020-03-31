// -----------------------------------------------------
// Fichier de preparation et de configuration 
// des differents elements de l'application
// Y. Stroppa
// 2020
// -----------------------------------------------------
// Modules necessaires : 
//       express, jade, serve-favicon, debug, body-parser 
// -----------------------------------------------------
var express = require('express');
console.log("Express OK");
var path = require('path');
var favicon = require('serve-favicon');
var index = require('./routes/index');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
// ------------------------------------------
// definition des chemins de l'application 
// index ou about tous les autres en erreurs
// ------------------------------------------
app.use('/', index);
app.get('/about', function(req, res) {
        res.sendFile(path.join(__dirname+'/public' + '/about.html'));
});

// ---------------------------------------------------
// Utilisation de jade 
// ---------------------------------------------------
// Handle 404
app.use(function(req, res) {
 res.status(400);
res.render('404.jade', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
res.render('500.jade', {title:'500: Internal Server Error', error: error});
});
// ---------------------------------------------------

module.exports = app;
