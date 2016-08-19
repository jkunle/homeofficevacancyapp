'use strict';
var ApplicantController = function (dataService) {


    function getApplicants(req, res) {

        let options = getOptions(res);

        dataService.getAllApplicants(
            options, function (err, applicantlist) {
                res.render('index', {
                    title: 'Home',
                    applicants: applicantlist
                });
            });
    };
    function getPagedApplicants(req, res) {

        let options = getOptions(res);

        dataService.getAllApplicants(
            options, function (err, applicantlist) {
                res.render('index', {
                    title: 'Home',
                    applicants: applicantlist
                });
            });

    };
    function getApplicantProfile(req, res) {

        var number = parseInt(req.params.number);

        dataService.getApplicantProfile(number, function (err, profile) {
            res.render('profile', {
                title: 'Home',
                profile: profile
            });
        });

    };

    function search(req, res) {

        let search = req.body.search;

        if (!isNaN(search)) {
            search = { 'number': parseInt(req.body.search) };
        }
        else {
            search = getPatternMatchingSearcherForAnyStringInFirstOrLastName(search);
        }
        let options = getOptions(res)
        options.query = search

        dataService.getAllApplicants(
            options, function (err, applicantlist) {
                res.render('index', {
                    title: 'Home',
                    applicants: applicantlist
                });
            });

    }
    function getPatternMatchingSearcherForAnyStringInFirstOrLastName(searchString) {
        // Take out spaces and replace with pipes
        var searchString = searchString.split(' ').join('|');
        // Use searchString to build rest of regex
        // -> Note: 'i' for case insensitive
        var regex = new RegExp(searchString, 'i');
        // Build query, using regex for each searchable field
        return {
            $or: [
                {
                    "firstname": {
                        "$regex": regex,
                    },
                },
                {
                    "lastname": {
                        "$regex": regex,
                    },
                },]
        };
    }
    function getOptions(res) {

        var limit = res.locals.limit;
        var page = res.locals.page;

        return {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { 'number': 1 },
            query: {}
        };
    }
    return {
        getApplicants: getApplicants,
        getPagedApplicants: getPagedApplicants,
        getApplicantProfile: getApplicantProfile,
        search: search
    }
}
module.exports = ApplicantController;