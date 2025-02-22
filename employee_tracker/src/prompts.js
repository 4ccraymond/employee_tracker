const inquirer = require('inquirer');
const db = require('./db');

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