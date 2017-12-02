'use strict';
var db=require('../../dbconnection'),
    jwt = require('jsonwebtoken'),
    propReader = require('properties-reader'),
    props = propReader('api.properties');

var userDB="Users";

//TODO: REMOVE "content":err BECAUSE 'err' HAS TOO MUCH INFO REGARDING DATABASE
var userController = {
    login: function(req, res){
        db.query("SELECT * FROM "+userDB+" WHERE Username=? AND Password=?",[req.body.username, req.body.password],function(err,rows){
            if(err) {
                res.json({"isSuccess":false, "message":"Error", "content":err});
            } else {
                if(!rows.length){
                    res.json({"isSuccess":false, "message":"Invalid login", "content":{}});
                } else {
                    var jwtToken = jwt.sign({username:req.body.username, password:req.body.password, id:rows[0]["Id"]}, props.get('jwt.secret'));
                    res.json({"isSuccess":true, "message":"Login successful", "content":{token:jwtToken}});
                }
            }
        });
    },
    signup: function(req, res){
        db.query("INSERT INTO "+userDB+" VALUES(NULL,?,?,?,?)",[req.body.username, req.body.password, req.body.firstname, req.body.lastname], function(err,rows){
            if(err) {
                res.json({"isSuccess":false, "message":"Error", "content":err});
            } else {
                var jwtToken = jwt.sign({username:req.body.username, password:req.body.password, id:rows["insertId"]}, props.get('jwt.secret'));
                res.json({"isSuccess":true, "message":"Signup successful", "content":{token:jwtToken, name:req.body.firstname}});
            }
        });
    },
    delete: function(req, res){
        jwt.verify(req.get('Authorization').slice(7),props.get('jwt.secret'),function(err,decoded){
            if(err) {
                res.json({"isSuccess":false, "message":"Error", "content":err});
            } else {
                db.query("DELETE FROM "+userDB+" WHERE Id=?",[decoded.id], function(err,rows){
                    if(err) {
                        res.json({"isSuccess":false, "message":"Error", "content":err});
                    } else {
                        if(rows["affectedRows"] == 0){
                            res.json({"isSuccess":false, "message":"Nothing to delete", "content":{}});
                        } else {
                            res.json({"isSuccess":true, "message":"Delete successful", "content":{}});
                        }
                    }
                });
            }
        });
    },
    update: function(req, res){
        jwt.verify(req.get('Authorization').slice(7),props.get('jwt.secret'),function(err,decoded){
            if(err) {
                res.json({"isSuccess":false, "message":"Error", "content":err});
            } else {
                db.query("UPDATE "+userDB+" SET Password=? WHERE Id=?",[req.body.password, decoded.id], function(err,rows){
                    if(err) {
                        res.json({"isSuccess":false, "message":"Error", "content":err});
                    } else {
                        if(rows["affectedRows"] == 0){
                            res.json({"isSuccess":false, "message":"Nothing to update", "content":{}});
                        } else {
                            res.json({"isSuccess":true, "message":"Update successful", "content":{}});
                        }
                    }
                });
            }
        });
    }
};

module.exports=userController;