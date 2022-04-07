//Install express server
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();

// Serve only the static files form the dist directory
app.use(serveStatic(path.join(__dirname,'dist')));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);