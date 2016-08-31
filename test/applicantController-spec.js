'use strict';
var chai = require("chai"),
    should = chai.should(),
    sinon = require('sinon'),
    expect = chai.expect,
    rewire = require("rewire");

var controller;

describe("controller behavior", function () {
    beforeEach(function () {
        
        controller = rewire("../controllers/applicantController")();
   
    });
    it("should be able to call getApplicants", function (done) {

        var req, res, spy;

        req = res = {};
        spy = res.render = sinon.spy();
        // act
        var stub = sinon.stub(controller);
        // assert
        controller.getApplicants(req, res);

        stub.getApplicants.called.should.be.true;
        done();
    });
});
