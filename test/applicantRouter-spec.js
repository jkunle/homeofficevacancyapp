'use strict';

var expect = require('chai');
var rewire = require('rewire');
var app = require('../index');

var routes = require('../routes/applicantRouter');

describe("home office vacancy routes", function () {

    var request = require('supertest');

    it("loads the application root", function(done){
        request(app).get("/").expect(200).end(done);
    });
    it ("loads the index page", function(done){
        request(app).get("/index").expect(200).end(done);
    });
    it ("loads the Pages page", function(done){
        request(app).get("/pages").expect(200).end(done);
    });

});
