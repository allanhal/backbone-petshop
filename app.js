var compression = require('compression')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
let jsonServer = require('json-server')
let app = jsonServer.create()
let router = jsonServer.router('db/db.json')
let middlewares = jsonServer.defaults()

app.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))

app.use(middlewares)
app.use(router)

app.use(compression())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;