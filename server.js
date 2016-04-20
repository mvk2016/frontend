const express     = require('express');
const expressLess = require('express-less');
const browserify  = require('browserify-middleware');

const app = express();

app.use('/style', expressLess(__dirname + '/less'));
app.get('/js/bundle.js', browserify(__dirname + '/js/main.jsx'));

/**
 * Serves static files from the root directory.
 */
app.use(express.static(__dirname));

app.listen('8000');
console.log('Listening on port 8000');
