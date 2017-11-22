var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/userRoute'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

app.use(function(err, req, res, next){
    res.status(400).json(err);
});

app.listen(port);

console.log('RESTful API server started on port: ' + port);