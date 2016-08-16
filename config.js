var path = require('path'),
    hbs = require('express-hbs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    _viewpath = path.join(__dirname, 'views/layouts');

var settings = {
    pageTitle: 'Home office vacancy app',
    assetPath: '/assets/',
    bodyClasses: '',
    govukRoot: 'https://gov.uk',
    headerClass: '',
    lang: 'en'
}
function init(app) {

    console.log("View path is :", _viewpath);

    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(_viewpath, 'main'),
        extname: ".hbs",
        layoutsDir: _viewpath,
        partialsDir: path.join(__dirname, 'views/partials')
    }));

    app.use(function (req, res, next) {
        res.locals.pageTitle = settings.pageTitle,
        res.locals.assetPath = settings.assetPath
        app.locals.bodyClasses = settings.bodyClasses
        app.locals.govukRoot = settings.govukRoot,
        app.locals.headerClass = settings.headerClass
        app.locals.htmlLang = settings.lang
        next();
    });

    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, 'views'));
    app.use('/assets', express.static(path.join(__dirname, settings.assetPath)));
    app.use('/css', express.static(path.join(__dirname, settings.assetPath)));
    app.use(express.static(_viewpath));
    ;

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));


}
module.exports = init;