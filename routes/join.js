var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/', function (req, res, next){
    res.render('join', { title: 'Join', id : '', pw : '', name : ''});
});

router.post('/', async(req, res, next) => {
    console.log(req.body)
    try{
        if (req.body.id == null || req.body.id.length == 0 || req.body.pw == null || req.body.pw.length == 0 || req.body.name == null || req.body.name.length == 0){
            res.render('join', { title: 'Join', id: req.body.id, pw: req.body.pw, name: req.body.name, error: 'Please enter ID, Password and Name' });
        }
        else {
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [req.body.id]); 
            if(rows.length > 0) {
                res.render('join', { title: 'Join', id: req.body.id, pw: req.body.pw, name: req.body.name, error: 'ID already exist. Try another ID, please.' });
            }
            else {
                await connection.query('INSERT INTO users (id, pwd, name) VALUES (?,?,?)', [req.body.id, req.body. pw, req.body.name]);
                res.redirect('/login');
            }
        }
    }
    catch (err) {
        next(err)
    }
});

module.exports = router;
