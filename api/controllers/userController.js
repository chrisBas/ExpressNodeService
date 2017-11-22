'use strict';
var db=require('../../dbconnection');

var userDB="Users";

var userController = {
    login: function(req, res){
        return db.query("SELECT * FROM "+userDB,null);
    },
    signup: function(req, res){
        return db.query("INSERT INTO "+userDB+" VALUES(?,?)",[req.body.username, req.body.password], null);
    },
    delete: function(req, res){
        return db.query("DELETE FROM "+userDB+" WHERE Id=?",[req.body.id], null);
    },
    update: function(req, res){
        return db.query("UPDATE "+userDB+" SET Username=?,Password=? WHERE Id=?",[req.body.username, req.body.password, req.body.id],null);
    }
};

module.exports=userController;