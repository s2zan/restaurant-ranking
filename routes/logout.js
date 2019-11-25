var express = require('express');
var router = express.Router();
var connection = require("../lib/db");

router.get('/', function (req, res, next) {
    req.session.user = null;
    res.redirect('/login');
});
module.exports = router;
