var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query("SELECT * FROM restaurants", function(err, rows) {
    if (err) {
      next(err);
    } else {
      // console.log("rows", rows);
      res.render('index', {
        title: 'Ewha-eats',
        messages: {
          success: true
        },
        restaurants: rows
      });
    }
  });
});

module.exports = router;
