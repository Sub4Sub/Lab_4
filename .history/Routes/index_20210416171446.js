var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET contact list page. */
router.get('/contact-list', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET projects page. */
router.get('/project', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'About' });
});

module.exports = router;
