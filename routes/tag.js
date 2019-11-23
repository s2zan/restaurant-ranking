var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/add', function (req, res, next) {
  res.render('addTag', { title: 'Add New Tag', action: 'add', name: '', desc: '' });
});

router.post('/add', async (req, res, next) => {
    try{
      const [rows] = await connection.query('INSERT INTO tags (name, `desc`) VALUES (?,?)', 
                        [req.body.name, req.body.desc]);
      res.redirect('/');
    }
    catch(err){
      next(err)
    }
  });

module.exports = router;