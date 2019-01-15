
'use strict';

require('dotenv').config()

var serverPort = process.env.PORT || 8080;
const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
var cors = require('cors')

var http = require('http');
var swaggerTools = require('swagger-tools');
var jwt = require('./api/helpers/jwt');
var errorHandler = require('./api/helpers/errorhandler');


var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); //suppression DeprecationWarning: collection.findAndModify is deprecated.
mongoose.set('useCreateIndex', true);
var mongoDB = 'mongodb://'+ process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(cors())

app.use(jwt());
app.use(errorHandler);


// SwaggerRouter configuration
var options = {
  controllers: path.join(__dirname, 'api/controllers'),
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};


// Get swagger YALM document
var swaggerDoc = null;
try {
  var swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'api/swagger/swagger.yaml'), 'utf8'));
  //console.log(swaggerDoc);
} catch (e) {
  console.log(e);
}


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});
