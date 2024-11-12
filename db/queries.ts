import { pool } from './connection';

export interface Department {
    id: number;
    name: string;
}

export interface Role {
    id: number;
    title: string;
    salary: number;
    department: string;
}

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    department: string;
    salary: number;
    manager: string | null;
}

export const viewAllDepartments = async (): Promise<Department[]> => {
    const res = await pool.query('SELECT * FROM department');
    return res.rows;
};

export const viewAllRoles = async (): Promise<Role[]> => {
    const res = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    return res.rows;
};

export const viewAllEmployees = async (): Promise<Employee[]> => {
    const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    return res.rows;
};

export const addDepartment = async (name: string): Promise<void> => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (title: string, salary: number, department_id: number): Promise<void> => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

export const addEmployee = async (first_name: string, last_name: string, role_id: number, manager_id: number | null): Promise<void> => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

export const updateEmployeeRole = async (employee_id: number, role_id: number): Promise<void> => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};


