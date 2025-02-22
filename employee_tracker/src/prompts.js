import inquirer from 'inquirer';
import db from './db.js';

const mainMenu = async () => {
    const {choice} = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    });

    switch (choice) {
        case 'View all departments':
            return viewDepartments();
        case 'View all roles':
            return viewRoles();
        case 'View all employees':
            return viewEmployees();
        case 'Add a department':
            return addDepartment();
        case 'Add a role':
            return addRole();
        case 'Add an employee':
            return addEmployee();
        case 'Update an employee role':
            return updateEmployeeRole();
        case 'Quit':
            return;
    }
};

const viewDepartments = async () => {
    try {
        const res = await db.query('SELECT id, name FROM department');
        console.table(res.rows);
    } catch (error) {
        console.error('Error viewing departments', error);
    }
};

const viewRoles = async () => {
    try {
        const res = await db.query('SELECT id, title, salary, department_id FROM role');
        console.table(res.rows);
    } catch (error) {
        console.error('Error viewing roles', error);
    }
};

const viewEmployees = async () => {
    try {
        const res = await db.query('SELECT id, first_name, last_name, role_id, manager_id FROM employee');
        console.table(res.rows);
    } catch (error) {
        console.error('Error viewing employees', error);
    }
};

const addDepartment = async () => {
    const {deptName} = await inquirer.prompt([{
        type: 'input',
        name: 'deptName',
        message: 'Enter the name of the department:'
    },
    ]);

    try {
        await db.query('INSERT INTO department (name) VALUES ($1)', [deptName]);
        console.log(`Department "${deptName}" added successfully`);
    } catch (error) {
        console.error('Error adding department', error);
    }
};

const addRole = async () => {
    const deptRes = await db.query('SELECT id, name FROM department');
    const departments = deptRes.rows.map(dept => ({
        name: dept.name, 
        value: dept.id
    }));

    const answers = await inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department of the role:',
            choices: departments
        }
    ]);

    try {
        await db.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [answers.title, answers.salary, answers.department_id]
        );
        console.log(`Role "${answers.title}" added successfully`);
    } catch (error) {
        console.error('Error adding role', error);
    }
};

const addEmployee = async () => {
    const roleRes = await db.query('SELECT id, title FROM role');
    const roles = roleRes.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employeeRes = await db.query('SELECT id, first_name, last_name FROM employee');
    const managers = employeeRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    managers.unshift({name: 'None', value: null});

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role of the employee:',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager of the employee:',
            choices: managers
        }
    ]);

    try {
        await db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4),'
            [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
        );
        console.log(`Employee "${answers.first_name} ${answers.last_name}" added successfully`);
    } catch (error) {
        console.error('Error adding employee', error);
    }
};

const updateEmployeeRole = async () => {
    const employeeRes = await db.query('SELECT id, first_name, last_name FROM employee');
    const employees = employeeRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roleRes = await db.query('SELECT id, title FROM role');
    const roles = roleRes.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to update:',
            choices: employees
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role of the employee:',
            choices: roles
        },
    ]);

    try {
        await db.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [answers.role_id, answers.employee_id]
        );
        console.log(`Employee updated successfully`);
    } catch (error) {
        console.error('Error updating employee', error);
    }
};

export default {mainMenu};