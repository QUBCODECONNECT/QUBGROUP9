var express = require('express');
var router = express.Router();
const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();



router.get('/', (req,res)=>{
    const employees = employeeService.getAllEmployees();
    console.log('here');
    res.render('employees',{employees})

});


router.get('/:id', (req, res) => {
    console.log("Hello");
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    res.render('employee', { employee: employee })
    
  });

  // Delete a user by ID form
router.get('/delete/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('deleteEmployee', {employee: employee})
});

 // Delete a user by ID
router.post('/delete/:id', (req, res) => {
  const deletedUser = employeeService.deleteEmployee(parseInt(req.params.id));
  if (!deletedUser) return res.status(404).send('Employee not found');
  res.redirect('/employees')
});

// Create a new user submit
router.post('/add', (req, res) => {
  const newEmployee = req.body;
  const createdEmployee = employeeService.createEmployee(newEmployee);
  res.redirect('/employees/' + createdEmployee.id)
});

// Update a user by ID form
router.get('/update/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('updateEmployee', {employee: employee})
});

// Update a user by ID
router.post('/update/:id', (req, res) => {
  const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
  if (!updatedEmployee) return res.status(404).send('Employee not found');
  res.redirect('/employees/' + updatedEmployee.id)
});


module.exports = router;
