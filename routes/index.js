var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/bustimetable', function(req, res, next) {
  res.render('bustimetable');
});
router.get('/discount', function(req, res, next) {
  res.render('discount');
});
router.get('/messageboard', function(req, res, next) {
  res.render('messageboard');
});
router.get('/trashcheck', function(req, res, next) {
  res.render('trashcheck');
});
router.get('/txtimetable', function(req, res, next) {
  res.render('txtimetable');
});
module.exports = router;
