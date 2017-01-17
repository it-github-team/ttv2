var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('template/base', {viewVar: 'index'});
});


router.get('/products', function(req, res) {
  res.render('template/base', {viewVar: 'products'});
});


router.get('/contact', function(req, res) {
  res.render('template/base', {viewVar: 'contact'});
});


router.get('/about', function(req, res) {
  res.render('template/base', {viewVar: 'about'});
});

module.exports = router;