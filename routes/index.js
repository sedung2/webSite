var express = require('express');
var multer = require('multer');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
