"use strict";
var express = require('express');
var app = express();
var config = require('./config')(app);

var repo = config.dao;
var dataService = require('./services/database')(repo);
var applicantController = require('./controllers/applicantController')(dataService);
// inject router dependencies the controller and dataservice
var applicantRouter = require('./routes/applicantRouter')(applicantController);

app.use(applicantRouter);

app.listen(3080);
console.log('Vacancy application is running on http://localhost:3080');