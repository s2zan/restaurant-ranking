var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/', function (req, res, next){
    res.render('login', { title: 'Ewha-eats', id: '', pw: '' });
});

router.get("/", function(req, res, next){
    console.log("login page");
    connection.query("SELECT pwd FROM users WHERE id = " + req.params.id, function(
        err,
        user,
        fields
    ){
        if(err){
            next(err);
        } if( pwd == req.params.pw ){
            console.log(id, pwd);
            res.redirect('/index');
        } else {
            console.log('else');
            res.redirect('/login');
        }
    });

});

module.exports = router;
