var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/', function (req, res, next){
    res.render('join', { title: 'Join', id : '', pw : '', name : ''});
});

router.post('/', function(req, res, next){
    try{
        var data = {
            id: req.body.id,
            pwd: req.body.pw,
            name: req.body.name
        };

        connection.query("INSERT INTO users SET ?", data, function(err, result){
            if(err){
                next(err);
            }
            console.log("result", result);
            res.redirect('/');
        });
    } catch(err){
        throw new Error(err);
    }
});

module.exports = router;
