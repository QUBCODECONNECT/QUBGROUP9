var express = require('express');
var router = express.Router();
const UserService = require('../services/userService');
const userService = new UserService();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
