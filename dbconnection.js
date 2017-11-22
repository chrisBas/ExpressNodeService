var mysql = require('mysql'),
    propReader = require('properties-reader'),
    props = propReader('api.properties');

var connection = mysql.createPool({
    host: props.get('db.host'),
    user: props.get('db.user'),
    password: props.get('db.password'),
    database: props.get('db.database.one')
});

module.exports = connection;