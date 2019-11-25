var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/add', function (req, res, next) {
  if(req.session.user == null){
    res.redirect('/login');
  }
  res.render('addTag', { title: 'Add New Tag', action: 'add', name: '', desc: '' });
});

router.post('/add', async (req, res, next) => {
  if(req.session.user == null){
    res.redirect('/login');
  }
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
  if(req.session.user == null){
    res.redirect('/login');
  }
  try{
    const [tag] = await connection.execute('SELECT * FROM tags WHERE id = ?', [req.params.id]);
    const [restaurants] = await connection.query("SELECT * , (SELECT AVG(score) FROM reviews WHERE restaurant_id = restaurants.id) as score "
                                                +"FROM restaurants "
                                                +"WHERE id IN (SELECT restaurant_id FROM mapping_tag_restaurant WHERE tag_id = ?) "
                                                +"ORDER BY score DESC", [req.params.id])
    console.log(restaurants)
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

router.get('/:id/delete', async (req, res, next) => {
  if(req.session.user == null){
    res.redirect('/login');
  }
    try{
      const [rows] = await connection.query('DELETE FROM tags WHERE id = ?', [req.params.id]);
      res.redirect('/');
    }
    catch(err){
      next(err)
    }
  });
  
router.get('/:id/edit', async (req, res, next) => {
  if(req.session.user == null){
    res.redirect('/login');
  }
    try{
      const [tag] = await connection.execute('SELECT * FROM tags WHERE id = ?', [req.params.id]);
      res.render("addTag", {
            title: "Edit Tag",
            action: tag[0].ID + "/edit",
            name: tag[0].NAME,
            desc: tag[0].DESC
        });
    }
    catch(err){
      next(err)
    }
  });

router.post('/:id/edit', async (req, res, next) => {
  if(req.session.user == null){
    res.redirect('/login');
  }
    try{
      const [rows] = await connection.query('UPDATE tags SET name = ?, `desc` = ? WHERE id = ?', 
                        [req.body.name, req.body.desc, req.params.id]);
      res.redirect('/tag/'+req.params.id);
    }
    catch(err){
      next(err)
    }
  });

module.exports = router;