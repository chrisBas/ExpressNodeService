var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/userRoute'),
    expressJWT = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    app = express(),
    port = process.env.PORT || 3000,
    propReader = require('properties-reader'),
    props = propReader('api.properties');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(expressJWT({secret: props.get('jwt.secret')}).unless({path: ['/public/signup', '/public/login']}))
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

app.use(function(err, req, res, next){
    res.status(400).json(err);
});

app.listen(port);

console.log('RESTful API server started on port: ' + port);