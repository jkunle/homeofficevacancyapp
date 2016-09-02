'use strict';
function DataAccess(repo) {

    var _repo = repo;

    return {
        getAllApplicants(param, callback) {

            _repo.applicants.find(param.query)
                .sort(param.sort).skip(param.skip)
                .limit(param.limit)
                .exec(function (err, result) {
                    return callback(err, result);
                });
        },
        getProfiles(callback) {

            _repo.profiles.find({}, function (err, result) {
                return callback(err, result);
            });

        },
        getApplicantProfile(no, callback) {

            _repo.applicants.find({ 'number': no }, function (err, app_result) {

                let {number, firstname, lastname} = app_result[0];

                _repo.profiles.find({ number: parseInt(no) }, function (err, prof_result) {

                    let {dob, work_experience} = prof_result[0];

                    return callback(err, {
                        number, firstname, lastname,dob, work_experience
                    });

                });

            });
        }
    }
}
module.exports = DataAccess;


