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
    // Get all employees
    getAllEmployees() {
        return this.readUsers();
    }

    // Get a employee by ID
    getEmployeeById(id) {
        const users = this.readUsers();
        return users.find(user => user.id === id);
    }
}

module.exports = EmployeeService;
