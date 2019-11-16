var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/login', function (req, res, next){
    res.render('login', { title: 'Ewha-eats'})
});

router.get("/login", function(req, res, next){
    console.log("login page")
    connection.query("SELECT pwd FROM users WHERE id = " + req.params.id, function(
        err,
        user,
        fields
    ){
        if(err){
            next(err);
        } if( pwd == req.params.pw ){
            res.redirect('/');
        } else {
            res.redirect('/index');
        }
    });

});

module.exports = router;
