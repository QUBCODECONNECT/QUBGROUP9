var express = require('express');
var router = express.Router();
const UserService = require('../services/employeeService');
const userService = new UserService();



router.get('/', (req,res)=>{
    const users = userService.getAllUsers();

    console.log('here');
    res.render('employees',{users})

  
});


module.exports = router;
