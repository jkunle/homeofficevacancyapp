"use strict";
var express = require('express');
var app = express();
var config = require('../config')(app);

function router(applicantController) {

    var applicantRouter = express.Router();

    applicantRouter
        .get('/', config.pagination, applicantController.getApplicants);
    applicantRouter
        .get('/index', config.pagination, applicantController.getApplicants);
    applicantRouter.get('/index/:number',
        applicantController.getApplicantProfile);
    applicantRouter.post('/search', applicantController.search);

    applicantRouter.get('/pages',
        config.pagination, applicantController.getApplicants);
    applicantRouter.get('/pages/:page',
        config.pagination, applicantController.getPagedApplicants);

    return applicantRouter;

}

module.exports = router;