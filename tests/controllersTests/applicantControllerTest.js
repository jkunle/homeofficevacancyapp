'use strict';
var chai = require("chai"),
should = chai.should(),
sinon = require('sinon');
Repo = require('../services/dao'),
DataService = require('../services/database'),
ApplicantController = require('../controllers/applicantController');

describe("tests should have a list of applicants", function(){
    var repo = sinon.stub(new Repo()),
    dataService = sinon.stub(new DataService(repo)),
    applicantController = sinon.stub(new ApplicationController(dataService));

    applicantController.
});