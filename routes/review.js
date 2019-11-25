var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.post('/:restaurant', async (req, res, next) => {
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

router.get('/:restaurant/:id/delete', async (req, res, next) => {
    if(req.session.user == null){
        req.session.url = '/restaurant/'+req.params.restaurant
        res.redirect('/login');
    }
    try{
        const [reviews] = await connection.query("SELECT user_id FROM reviews WHERE id = ?", [req.params.id])
        if(reviews[0].user_id == req.session.user)
        {
            await connection.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
            res.redirect('/restaurant/'+req.params.restaurant);
        }
    }
    catch(err){
        next(err)
    }
});
module.exports = router;
