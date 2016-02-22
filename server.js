var express = require('express');
var app = express();


/**
 * Serves static files from the root directory.
 */
app.use(express.static(__dirname));



app.listen('8000');
console.log('Listening on port 8000');