var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/add', async (req, res, next) => {
  if(req.session.user == null){
    req.session.url = '/restaurant/add'
    res.redirect('/login');
  }
  try{
    const [tags] = await connection.execute('SELECT id, name FROM tags');
    res.render('addRestaurant', { title: 'Add New Restaurant', action: 'add', name: '', address: '', tags: tags});
  }
  catch (err){
    next(err);
  }
});


router.post('/add', async (req, res, next) => {
  if(req.session.user == null){
    req.session.url = '/restaurant/add'
    res.redirect('/login');
  }
  try{
    if (req.body.name == null || req.body.name.length == 0) {
      const [tags] = await connection.execute('SELECT id, name FROM tags');
      res.render('addRestaurant', { title: 'Add New Restaurant', action: 'add', name: '', address: req.body.address, tags: tags, error: "Please Insert Restaurant's Name!"});
    }
    else {
      const [rows] = await connection.query('INSERT INTO restaurants (name, address) VALUES (?,?)', 
                        [req.body.name, req.body.address]);

      if(req.body.tags != null){
        let tags = null
        if(Array.isArray(req.body.tags))
          tags = req.body.tags.map(x=>[rows.insertId, x])
        else
          tags = [[rows.insertId, req.body.tags]]

        await connection.query('INSERT INTO mapping_tag_restaurant (restaurant_id, tag_id) VALUES ?', [tags]);
      }
      res.redirect('/');
    }
  }
  catch(err){
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  if(req.session.user == null){
    req.session.url = '/restaurant/'+req.params.id
    res.redirect('/login');
  }
  try{
    const [restaurant] = await connection.execute('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    const [tags] = await connection.query("SELECT tags.id, tags.name FROM tags INNER JOIN mapping_tag_restaurant AS m "
                                          + "ON tags.id = m.tag_id "
                                          + "WHERE m.restaurant_id = ?", [req.params.id])
    const [score] = await connection.query("SELECT avg(score) FROM reviews WHERE restaurant_id = ?", [req.params.id])
    const [reviews] = await connection.query("SELECT reviews.id, user_id, `name`, `comment`, score, created_at FROM reviews join users on user_id = users.id WHERE restaurant_id = ? ORDER BY created_at DESC", [req.params.id])
    res.render("restaurantDetail", {
      title: "Restaurant Detail",
      id: restaurant[0].ID,
      name: restaurant[0].NAME,
      address: restaurant[0].ADDRESS,
      tags: tags,
      score: score[0]['avg(score)'],
      reviews: reviews,
      user: req.session.user
    });
  }
  catch(err){
    next(err)
  }
});

router.get('/:id/delete', async (req, res, next) => {
  if(req.session.user == null){
    req.session.url = '/restaurant/'+req.params.id
    res.redirect('/login');
  }
  try{
    const [rows] = await connection.query('DELETE FROM restaurants WHERE id = ?', [req.params.id]);
    res.redirect('/');
  }
  catch(err){
    next(err)
  }
});

router.get('/:id/edit', async (req, res, next) => {
  if(req.session.user == null){
    req.session.url = '/restaurant/'+req.params.id
    res.redirect('/login');
  }
  try{
    const [restaurant] = await connection.execute('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    const [tags] = await connection.query("SELECT tags.id, tags.name, m.restaurant_id FROM tags LEFT OUTER JOIN mapping_tag_restaurant AS m "
                                          + "ON tags.id = m.tag_id "
                                          + "AND m.restaurant_id = ?", [req.params.id])
    res.render("addRestaurant", {
          title: "Edit Restaurant",
          action: restaurant[0].ID + "/edit",
          id: restaurant[0].ID,
          name: restaurant[0].NAME,
          address: restaurant[0].ADDRESS, 
          tags: tags
      });
  }
  catch(err){
    next(err)
  }
});


router.post('/:id/edit', async (req, res, next) => {
  if(req.session.user == null){
    req.session.url = '/restaurant/'+id
    res.redirect('/login');
  }
  try{
    if (req.body.name == null || req.body.name.length == 0) {
      const [tags] = await connection.query("SELECT tags.id, tags.name, m.restaurant_id FROM tags LEFT OUTER JOIN mapping_tag_restaurant AS m "
      + "ON tags.id = m.tag_id "
      + "AND m.restaurant_id = ?", [req.params.id])
      res.render('addRestaurant', { title: 'Edit Restaurant', action: req.params.id + "/edit", name: '', address: req.body.address, tags: tags, error: "Please Insert Restaurant's Name!"});
    }
    else {
      await connection.query('UPDATE restaurants SET name = ?, address = ? WHERE id = ?', 
                        [req.body.name, req.body.address, req.params.id]);
      await connection.query('DELETE FROM mapping_tag_restaurant WHERE restaurant_id = ?', [req.params.id]);
      
      if(req.body.tags != null){
        let tags = null
        if(Array.isArray(req.body.tags))
          tags = req.body.tags.map(x=>[req.params.id, x])
        else
          tags = [[req.params.id, req.body.tags]]
        console.log(tags)
        await connection.query('INSERT INTO mapping_tag_restaurant (restaurant_id, tag_id) VALUES ?', [tags]);
      }
      res.redirect('/restaurant/'+req.params.id);
    }
  }
  catch(err){
    next(err)
  }
});

module.exports = router;
