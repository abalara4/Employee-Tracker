-- Insert sample departments
INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Marketing'),
('Human Resources');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Senior Software Engineer', 100000, 1),
('Sales Representative', 50000, 2),
('Marketing Manager', 65000, 3),
('HR Specialist', 55000, 4);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- John has no manager
('Jane', 'Smith', 2, 1),  -- Jane reports to John
('Michael', 'Johnson', 3, 2), -- Michael reports to Jane
('Emily', 'Davis', 4, 3), -- Emily reports to Michael
('Sarah', 'Lee', 5, NULL); -- Sarah has no manager

