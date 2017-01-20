var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('template/base', {base: 'home', viewVar: 'index'});
});


router.get('/products', function(req, res) {
  res.render('template/base', {base: 'home', viewVar: 'products'});
});


router.get('/contact', function(req, res) {
  res.render('template/base', {base: 'home', viewVar: 'contact'});
});


router.get('/about', function(req, res) {
  res.render('template/base', {base: 'home', viewVar: 'about'});
});

module.exports = router;