'use strict';
var path = require('path'),
    hbs = require('express-hbs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    _viewpath = path.join(__dirname, 'views/layouts'),
    dao = require('./services/dao')();

var settings = {
    pageTitle: 'Home office vacancy app',
    assetPath: '/assets/',
    bodyClasses: '',
    govukRoot: 'https://gov.uk',
    govukText: 'GOV.UK',
    headerClass: 'with-proposition',
    logoLinkTitle: 'Go to the GOV.UK homepage',
    lang: 'en',
    jobtitle: 'HOM/963/16 Developer x6',
    jobref: 1499294
};
var total = require('./services/data.json').length;
var limit = 25;
var pages = [];

function paginationMiddleware(req, res, next) {

    var page = parseInt(req.params.page) || 1,
        pageEnd = page * limit,
        pageStart = pageEnd - (limit - 1);

    let pageCount = Math.ceil(total / limit);

    for (var number = 1; number <= pageCount; number++) {
        let link = `/pages/${number}`;
        pages[number - 1] = {
            number: number,
            link: link
        };
    }
    res.locals.pages = pages;
    res.locals.limit = limit;
    res.locals.pageStart = pageStart;
    res.locals.pageEnd = pageEnd;
    res.locals.pageCount = pageCount;
    res.locals.page = page;
    res.locals.total = total;
    next();
};
function configureLocalDataMiddleware(req, res, next) {
    res.locals.title = settings.pageTitle;
    res.locals.baseurl = '/';
    res.locals.logoLinkTitle = settings.jobtitle;
    res.locals.globalHeaderText = settings.govukText;
    res.locals.insideHeader = settings.pageTitle;

    res.locals.pageTitle = settings.pageTitle;
    res.locals.assetPath = settings.assetPath;
    res.locals.bodyClasses = settings.bodyClasses;
    res.locals.govukRoot = settings.govukRoot;
    res.locals.headerClass = settings.headerClass;
    res.locals.htmlLang = settings.lang;

    res.locals.jobtitle = settings.jobtitle;
    res.locals.jobref = settings.jobref;
    next();
}
function init(app) {

    console.log("View path is :", _viewpath);

    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(_viewpath, 'main'),
        extname: ".hbs",
        layoutsDir: _viewpath,
        partialsDir: path.join(__dirname, 'views/partials')
    }));

    app.use(configureLocalDataMiddleware);


    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, 'views'));
    app.use('/assets', express.static(path.join(__dirname, settings.assetPath)));
    app.use('/css', express.static(path.join(__dirname, 'css')));
    app.use(express.static(_viewpath));


    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    return {
        dao: dao,
        pagination: paginationMiddleware
    }

}
module.exports = init;