var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/add', function (req, res, next) {
  res.render('addRestaurant', { title: 'Add New Restaurant', action: 'add', name: '', address: '' });
});


router.post('/add', async (req, res, next) => {
  try{
    const [rows] = await connection.query('INSERT INTO restaurants (name, address) VALUES (?,?)', 
                      [req.body.name, req.body.address]);
    res.redirect('/');
  }
  catch(err){
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const [restaurant] = await connection.execute('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    const [tags] = await connection.query("SELECT tags.id, tags.name FROM tags INNER JOIN mapping_tag_restaurant AS m "
                                          + "ON tags.id = m.tag_id "
                                          + "WHERE m.restaurant_id = ?", [req.params.id])
    res.render("restaurantDetail", {
      title: "Restaurant Detail",
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

router.get('/:id/delete', async (req, res, next) => {
  try{
    const [rows] = await connection.query('DELETE FROM restaurants WHERE id = ?', [req.params.id]);
    res.redirect('/');
  }
  catch(err){
    next(err)
  }
});

router.get('/:id/edit', async (req, res, next) => {
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
  try{
    await connection.query('UPDATE restaurants SET name = ?, address = ? WHERE id = ?', 
                      [req.body.name, req.body.address, req.params.id]);
    await connection.query('DELETE FROM mapping_tag_restaurant WHERE restaurant_id = ?', [req.params.id]);
    let tags = null
    if(Array.isArray(req.body.tags))
      tags = req.body.tags.map(x=>[req.params.id, x])
    else
      tags = [[req.params.id, req.body.tags]]
    console.log(tags)
    await connection.query('INSERT INTO mapping_tag_restaurant (restaurant_id, tag_id) VALUES ?', [tags]);
    res.redirect('/restaurant/'+req.params.id);
  }
  catch(err){
    next(err)
  }
});

module.exports = router;
