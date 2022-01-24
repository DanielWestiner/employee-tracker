USE employee_db;
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 250000, 1),
       ("VP", 175000, 1),
       ("Lead Manager", 95000, 2),
       ("Associate", 78000, 2),
       ("Chief Counsel", 125000, 3),
       ("Lawyer", 100000, 3),
       ("Engineer", 90000, 4),
       ("Account Manager", 83000, 4);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Franklin", "Hart", 1, NULL),
       ("Sterling", "Hayden", 2, 1),
       ("Doralee", "Rhodes", 3, NULL),
       ("Violet", "Newstead", 4, 3),
       ("Judy", "Bernly", 5, NULL),
       ("Bob", "Enright", 6, 5),
       ("Chuck", "Strell", 7, NULL),
       ("Reynaldo", "Villalobos", 8, 7);
       
