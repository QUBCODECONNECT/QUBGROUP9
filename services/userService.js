// userService.js
const fs = require('fs');

class UserService {
    constructor() {
        this.filePath = "users.json";
        this.userAccounts = "user_account.json"
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
            // Helper function to read users from JSON file
            readUserAccounts() {
                try {
                    const data = fs.readFileSync(this.userAccounts, 'utf8');
                    return JSON.parse(data);
                } catch (err) {
                    console.error('Error reading users:', err);
                    return [];
                }
            }
    

    // Helper function to write users to JSON file
    writeUsers(users) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing users:', err);
        }
    }

    // Get all users
    getAllUsers() {
        return this.readUsers();
    }

    // Get a user by ID
    getUserById(id) {
        const users = this.readUsers();
        return users.find(user => user.id === id);
    }

    // Create a new user
    createUser(newUser) {
        const users = this.readUsers();
        newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(newUser);
        this.writeUsers(users);
        return newUser;
    }

    // Update a user by ID
    updateUser(id, updatedUser) {
        const users = this.readUsers();
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        updatedUser.id = id;
        users[userIndex] = updatedUser;
        this.writeUsers(users);
        return updatedUser;
    }

    // Delete a user by ID
    deleteUser(id) {
        const users = this.readUsers();
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        const deletedUser = users.splice(userIndex, 1);
        this.writeUsers(users);
        return deletedUser[0];
    }
    checkCredentials(username, password){
        const userAccounts = this.readUserAccounts();
        const userIndex = userAccounts.findIndex(userAccounts => userAccounts.username === username);

        if (userIndex === -1){
            console.log("passwords dont match");
            return false;
        } 

        if (userAccounts[userIndex].password === password){
            console.log("passwords match");
            return true;
        }
    }
}

module.exports = UserService;
