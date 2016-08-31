var expect = require("chai").expect;
var rewire = require("rewire");
var sinon = require("sinon");


describe("DataAccess interaction ", function () {
    var repo = dataService = {};
    beforeEach(function () {

        repo = require("../services/dao")();
        dataService = require('../services/database')(repo);
        //var stub = sinon.stub(dataService);

    });
    it("applicant list should return with records limited to 10", function (done) {
        // arrange
        var options = {
            skip: 0,
            limit: 10,
            sort: { 'number': 1 },
            query: {}
        };
        //assert
        dataService.getAllApplicants(options, function (err, applicantlist) {

            expect(applicantlist.length).to.equal(10);

            done();
        });
    });

   
})