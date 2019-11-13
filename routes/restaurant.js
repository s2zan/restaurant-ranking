var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/add', function (req, res, next) {
  res.render('addRestaurant', { title: 'Add New Restaurant' });
});

router.post('/add', function (req, res, next) {
  try {
    var data = {
      name: req.body.name,
      address: req.body.address
    };

    connection.query("INSERT INTO restaurants SET ?", data, function (err, result) {
      if (err) {
        next(err);
      }
      console.log("result", result);
      res.redirect('/');
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get('/:id', function (req, res, next) {
  connection.query("SELECT * FROM restaurants WHERE id = " + req.params.id, function (
    err,
    restaurant,
    fields
  ) {
    if (err) {
      next(err);
    }
    if (restaurant.length <= 0) {
      res.redirect("/");
    } else {
      connection.query("SELECT tags.title "
        + "FROM tags "
        + "INNER JOIN mapping_tag_restaurant AS m "
        + "ON tags.id = m.tag_id "
        + "WHERE m.restaurant_id = " + req.params.id, function (
          err,
          tags,
          fields
        ) {
        if (err) {
          next(err);
        }
        else {
          console.log("restaurant", restaurant);
          res.render("restaurantDetail", {
            title: "Restaurant Detail",
            //data: result[0],
            id: restaurant[0].ID,
            name: restaurant[0].NAME,
            address: restaurant[0].ADDRESS,
            tags: tags
          });
        }
      });
    }
  });
});

router.get('/:id/delete', function (req, res, next) {
  connection.query("DELETE FROM restaurants WHERE id = " + req.params.id, function (
    err,
    restaurant
  ) {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
