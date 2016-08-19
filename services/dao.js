"use strict";
// Require the nedb module
var Datastore = require('nedb') //using this cause it feels like mongodb
var store = require('./data.json');

// helper function to generate email that matches first.last@domain.com
function generateCorrelatedEmail(first, last, email) {
    return `${first}.${last}${email.substring(email.indexOf('@'), email.length)}`;
}
function DaO() {

    // create instances representing a list of applicants and a list of their profiles
    let applicants = new Datastore({ filename: './database/applicants', autoload: true });
    let profiles = new Datastore({ filename: './database/applicant_profiles', autoload: true });

    // Create a "unique" index for the applicant number and profile number
    applicants.ensureIndex({ fieldName: 'number', unique: true });
    profiles.ensureIndex({ fieldName: 'number', unique: true });
    
    for (let data of store) {

        let {number, firstname, lastname, date} = data;
        let {email, contact_number, nationality, work_experience} = data;

        var profileMail = generateCorrelatedEmail(firstname, lastname, email);
        // insert into applicants collection
        applicants.insert({ number, firstname, lastname, date });
        // insert into profiles collection
        profiles.insert({ number, profileMail, contact_number, nationality, work_experience });
    }


    return {
        applicants: applicants,
        profiles: profiles
    }

}

module.exports = DaO;