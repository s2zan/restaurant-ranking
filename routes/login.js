var express = require('express');
var router = express.Router();
var connection = require("../lib/db");


router.get('/', function (req, res, next) {
    console.log(req.session)
    res.render('login', { title: 'EWHA-eats', id: '', pw: '' });
});

router.post("/", async (req, res, next) => {
    console.log(req.session)
    try{
        if (req.body.id == null || req.body.id.length == 0 || req.body.pw == null || req.body.pw.length == 0){
            res.render('login', { title: 'EWHA-eats', id: '', pw: '', error: 'Please enter ID and Password' });
        }
        else {
            const [pwd] = await connection.query('SELECT pwd FROM users WHERE id = ?', [req.body.id]); 
            if(pwd.length == 0) {
                res.render('login', { title: 'EWHA-eats', id: req.body.id, pw: '', error: 'Check your ID or Password' });
            }
            else {
                if(pwd[0].pwd != req.body.pw) {
                    res.render('login', { title: 'EWHA-eats', id: req.body.id, pw: '', error: 'Check your ID or Password' });
                }
                else {
                    req.session.user = req.body.id;
                    if(req.session.url == null) res.redirect('/');
                    else res.redirect(req.session.url);
                }
            }
        }
    }
    catch (err) {
        next(err)
    }
});
module.exports = router;
