const fs = require('fs');
 
class EmployeeService {
    constructor() {
        this.filePath = "employees.json";
    }
 
    // Helper function to read users from JSON file
    readUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading users:', err);
            return [];
        }
    }
 
     writeUsers(employees) {
            try {
                fs.writeFileSync(this.filePath, JSON.stringify(employees, null, 2), 'utf8');
            } catch (err) {
                console.error('Error writing users:', err);
            }
        }
    // Get all employees
    getAllEmployees() {
        return this.readUsers();
    }
 
    // Get a employee by ID
    getEmployeeById(id) {
        const employees = this.readUsers();
        return employees.find(employee => employee.id === id);
    }
    // Create a new user
    createEmployee(newEmployee) {
        const employees = this.readUsers();
        newEmployee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
        employees.push(newEmployee);
        this.writeUsers(employees);
        return newEmployee;
    }
 
    // Update a user by ID
    updateEmployee(id, updatedEmployee) {
        const employees = this.readUsers();
        const userIndex = employees.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
 
        updatedEmployee.id = id;
        employees[userIndex] = updatedEmployee;
        this.writeUsers(employees);
        return updatedEmployee;
    }
 
    // Delete a user by ID
    deleteEmployee(id) {
        const employees = this.readUsers();
        const userIndex = employees.findIndex(user => user.id === id);
        if (userIndex === -1) return null;
 
        const deletedUser = employees.splice(userIndex, 1);
        this.writeUsers(employees);
        return deletedUser[0];
    }
}
 
module.exports = EmployeeService;
