var express = require('express');
var router = express.Router();
const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();





router.get('/', (req,res)=>{
  if (!req.session.user){
    res.render('login', {fail: false});
  }
    const employees = employeeService.getAllEmployees();
    console.log('here');
    res.render('employees',{employees})

});


router.get('/:id', (req, res) => {
  if (!req.session.user){
    res.render('login', {fail: false});
  }
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));

    if (!employee) return res.status(404).send('Employee not found');
    res.render('employee', { employee: employee })
    
  });


module.exports = router;
