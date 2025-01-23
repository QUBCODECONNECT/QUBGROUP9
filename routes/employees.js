var express = require('express');
var router = express.Router();
const UserService = require('../services/employeeService');
const userService = new UserService();



router.get('/', (req,res)=>{
    const users = userService.getAllUsers();

    console.log('here');
    res.render('employees',{users})

  
});


router.get('/:id', (req, res) => {
    console.log("Hello");
    const employee = userService.getUserById(parseInt(req.params.id));
    console.log(`here ${employee.name}`);
    if (!employee) return res.status(404).send('Employee not found');
    res.render('employee', { employee: employee })
    
  });


module.exports = router;
