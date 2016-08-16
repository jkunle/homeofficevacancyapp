// Require the nedb module
var Datastore = require('nedb') //using this cause it feels like mongodb
var store = require('./data.json');
// create instances representing a list of applicants and a list of their profiles
var _applicants = new Datastore({ filename:  './database/applicants', autoload: true });
var _profiles = new Datastore({ filename:  './database/applicant_profiles', autoload: true });

function DaO() {
    // helper function to generate email that matches first.last@domain.com
    function generateCorrelatedEmail(first , last, email){
        return  `${first}.${last}${email.substring(email.indexOf('@'), email.length)}`;
    }
	
    function getAllApplicants(callback) {
		_applicants.find({}, function (err, result) {
			return callback(err, result);
		});
    }
    //Insert applicant and profile from data.json into two seperate collections
    // managed by this service. This is executed on every start up of the application
    // however because of th unique contraint, subsequent writes will fail. Thus maintaining
    // the same data set.
	(function loadApplicantsfromDataDotJSON (req, res) {
        
        let applicants = _applicants;
        let profiles = _profiles
        
        for (let data of store) {
                let {number, firstname, lastname, date} = data; 
                let {email,contact_number,nationality,work_experience} = data;
                var profileMail = generateCorrelatedEmail(firstname, lastname, email);
                // insert into applicants collection
                applicants.insert( {number,firstname, lastname, date});
                // insert into profiles collection
                profiles.insert({number, profileMail, contact_number,nationality,work_experience});
        }
        // Create a "unique" index for the applicant number and profile number
        applicants.ensureIndex({ fieldName: 'number', unique: true });
	    profiles.ensureIndex({ fieldName: 'number', unique: true });

	})(_applicants, _profiles);
    
   

	return {
		getAllApplicants: getAllApplicants
	}
}

module.exports = DaO;

	
