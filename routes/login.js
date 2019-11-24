var express = require('express');
var router = express.Router();
var connection = require("../lib/db");


router.get("/", function(req, res, next){
    console.log("login page");
    connection.query("SELECT pwd FROM users WHERE id = " + req.params.id, function(
        err,
        pwd,
        fields
    ){
        if(err){
            next(err);
        } if( pwd == req.params.pw && pwd != null ){
            console.log('pwd compared');
            console.log(req.params.id, pwd);
            res.redirect('/index');
        } else {
            console.log('else');
            res.redirect('/main');
        }
    });

});

module.exports = router;
