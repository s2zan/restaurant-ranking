var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/join', function (req, res, next){
    res.render('join', { title: 'Ewha-eats'})
});

router.post('/login/join', function(req, res, next){
    try{
        var data = {
            id: req.body.id,
            pw: req.body.pw,
            name: req.body.name
        };

        connection.query("INSERT INTO users SET ?", data, function(err, result){
            if(err){
                next(err);
            }
            res.redirect('/');
        });
    } catch(err){
        throw new Error(err);
    }
});

module.exports = router;
