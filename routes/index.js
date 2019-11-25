const express = require('express');
const router = express.Router();
const connection = require("../lib/db");

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.session.user == null){
    res.redirect('/login');
  }
  const [restaurants] = await connection.execute('SELECT res.*, AVG(score) as score '
                                              + 'FROM restaurants as res '
                                              + 'LEFT OUTER JOIN reviews as rev '
                                              + 'ON res.id = rev.restaurant_id '
                                              + 'GROUP BY res.id '
                                              + 'ORDER BY score DESC');
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
