// Creates an employee object with a name, id, and email.
class Employee{
    constructor(name, id, email) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.role = 'Employee';
    }   
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
}
module.exports = Employee;