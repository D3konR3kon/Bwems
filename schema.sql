CREATE DATABASE workman_ems;
USE workman_ems;

CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR (255),
    lname VARCHAR(255),
    sex VARCHAR(10),
    age INT,
    dept VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(255),
    salary DECIMAL(10, 2),
    id_number BIGINT,
    cell_number VARCHAR(20),
    address TEXT,
    start_date DATE,
    position VARCHAR(255),
    contract VARCHAR(255),
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO employees (fname, lname, sex, age, dept, email, status, salary, id_number, cell_number, address, start_date, position, contract)
VALUES (
    'Vuyo',
    'Dila',
    'Male',
    33,
    'IT',
    'john.doe@example.com',
    'Active',
    50000.00,
    9005056680085,
    0872123435,
    '123 Main St, City',
    NOW(), 
    'Developer',
    'Permanent'
);


