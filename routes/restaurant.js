var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/add', function(req, res, next) {
  res.render('addRestaurant', { title: 'Add New Restaurant' });
});

router.post('/add', function(req, res, next) {
  try {
    var data = {
      name: req.body.name,
      address: req.body.address
    };

    connection.query("INSERT INTO restaurants SET ?", data, function(err, result) {
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

module.exports = router;
