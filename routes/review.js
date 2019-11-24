var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.post('/:restaurant', async (req, res, next) => {
    console.log(req.body)
    if(req.session.user == null){
        req.session.url = '/restaurant/'+req.params.restaurant
        res.redirect('/login');
    }
    try{
        const [rows] = await connection.query('INSERT INTO reviews (restaurant_id, user_id, comment, score, created_at) VALUES (?,?,?,?,?)', 
                          [req.params.restaurant, req.session.user, req.body.comment, req.body.score, new Date()]);
        res.redirect('/restaurant/'+req.params.restaurant);
    }
    catch(err){
        next(err)
    }
});
module.exports = router;
