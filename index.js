var express = require('express');
var app = express();

require('./config')(app);
var dataService = require('./services/database')();
var homeController = require('./controllers/homeController');
// inject router dependencies the controller and dataservice
var homeRouter = require('./routes/homeRouter')(homeController, dataService);

app.use('/', homeRouter)

app.listen(3080);
console.log('Vacancy application is running on http://localhost:3080');