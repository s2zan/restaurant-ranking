const express = require('express');
const router = express.Router();
const connection = require("../lib/db");

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.session.user == null){
    res.redirect('/login');
  }
  const [restaurants] = await connection.execute('SELECT * FROM restaurants');
  const [tags] = await connection.execute('SELECT * FROM tags');

  res.render('index', {
    title: 'Ewha-eats',
    messages: {
      success: true
    },
    restaurants: restaurants,
    tags: tags
  });
});

module.exports = router;
