// Require the nedb module
'use strict';
function DataAccess(repo) {

    var _repo = repo;

    function getAllApplicants(param, callback) {

        _repo.applicants.find(param.query)
            .sort(param.sort).skip(param.skip)
            .limit(param.limit)
            .exec(function (err, result) {
                return callback(err, result);
            });
    }

    function getProfiles(callback) {

        _repo.profiles.find({}, function (err, result) {
            return callback(err, result);
        });

    }

    function getApplicantProfile(no, callback) {


        _repo.applicants.find({ 'number': no }, function (err, app_result) {

            let {number, firstname, lastname} = app_result[0];

            _repo.profiles.find({ number: parseInt(no) }, function (err, prof_result) {

                let {profileMail, contact_number, nationality, work_experience} = prof_result[0];

                return callback(err, {
                    number, firstname, lastname, profileMail,
                    contact_number, nationality, work_experience
                });

            });

        });

    }
   
    return {
        getAllApplicants: getAllApplicants,
        getProfiles: getProfiles,
        getApplicantProfile: getApplicantProfile,
    }
}

module.exports = DataAccess;


