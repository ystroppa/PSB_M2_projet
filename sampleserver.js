// ------------------------------------------
// fichier : sampleserver.js
// Modules : express 
// Y. STROPPA
// PWA 2020 
// ------------------------------------------
var http = require('http'); 
var debug = require('debug')('version3:server');
var app = require('./app'); 
var fs = require('fs'); // get the fs module

// ----------------------------------------------
// Fonction SERVEUR
// ----------------------------------------------
/**Normalize a port into a number, string, or false.*/
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**Event listener for HTTP server "error" event*/
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**Event listener for HTTP server "listening" event.*/
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// ----------------------------------------------
// Création HTTP Serveur avec app 
// ----------------------------------------------
console.log("Creation du serveur ... 8124");
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '8124');
app.set('port', port);
// Create HTTP server.
var server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log("Done");
