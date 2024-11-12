import inquirer from 'inquirer';
import * as db from './db/queries';
import * as dotenv from 'dotenv';

dotenv.config();

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View all departments':
            console.table(await db.viewAllDepartments());
            break;
        case 'View all roles':
            console.table(await db.viewAllRoles());
            break;
        case 'View all employees':
            console.table(await db.viewAllEmployees());
            break;
        case 'Add a department':
            const { deptName } = await inquirer.prompt([
                { type: 'input', name: 'deptName', message: 'Department name:' },
            ]);
            await db.addDepartment(deptName);
            console.log(`Added department ${deptName}`);
            break;
        case 'Add a role':
            const { title, salary, department_id } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Role title:' },
                { type: 'input', name: 'salary', message: 'Role salary:' },
                { type: 'input', name: 'department_id', message: 'Department ID:' },
            ]);
            await db.addRole(title, parseFloat(salary), parseInt(department_id));
            console.log(`Added role ${title}`);
            break;
        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: "Employee's first name:" },
                { type: 'input', name: 'lastName', message: "Employee's last name:" },
                { type: 'input', name: 'roleId', message: "Employee's role ID:" },
                { type: 'input', name: 'managerId', message: "Manager's ID (leave blank if none):", default: undefined },
            ]);
            await db.addEmployee(firstName, lastName, parseInt(roleId), managerId ? parseInt(managerId) : null);
            console.log(`Added employee ${firstName} ${lastName}`);
            break;
        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'employeeId', message: "Employee's ID:" },
                { type: 'input', name: 'newRoleId', message: "New role ID:" },
            ]);
            await db.updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
            console.log('Employee role updated');
            break;
        case 'Exit':
            console.log('Exiting...');
            process.exit();
    }
    mainMenu();
};

mainMenu();

