var express = require('express');
var router = express.Router();
const UserService = require('../services/userService');
const userService = new UserService();


/* GET home page. */

router.get('/login', (req,res, next)=>{
  res.render('login',{fail: false});
  

});

router.post('/login', (req,res) =>{

  const {username, password} = req.body;


  if (userService.checkCredentials(username, password) === true ) {
    console.log("LOG IN SUCCESS");
    req.session.isLoggedin = true;
    req.session.user = {username: username}
    res.redirect('/');
  }
  else {
    res.render('login', {fail: true});
  }

});

router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.render('login', {fail: false});
  }
  res.render('index', { title: 'Express' });
});


module.exports = router;
