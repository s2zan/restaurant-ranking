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


router.get('/:id', async (req, res, next) => {
  try{
    const [tag] = await connection.execute('SELECT * FROM tags WHERE id = ?', [req.params.id]);
    const [restaurants] = await connection.query("SELECT r.* FROM restaurants AS r INNER JOIN mapping_tag_restaurant AS m "
                                          + "ON r.id = m.tag_id "
                                          + "WHERE m.tag_id = ?", [req.params.id])
    res.render("tagDetail", {
      title: "Tag Detail",
      id: tag[0].ID,
      name: tag[0].NAME,
      desc: tag[0].DESC,
      restaurants: restaurants
    });
  }
  catch(err){
    next(err)
  }
});
module.exports = router;