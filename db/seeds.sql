INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
       
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 250000, 1),
       ("VP", 175000, 1),
       ("Lead Manager", 95000, 2),
       ("Associate", 78000, 2),
       ("Chief Counsel", 125000, 3),
       ("Lawyer", 100000, 3),
       ("Engineer", 90000, 4),
       ("Account Manager", 83000, 4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Franklin", "Hart", 1, null),
       ("Sterling" "Hayden", 2, 1),
       ("Doralee", "Rhodes" 3, null),
       ("Violet", "Newstead" 4, 2),
       ("Judy", "Bernly", 5, null),
       ("Bob", "Enright", 6, 3),
       ("Chuck", "Strell", 7, null),
       ("Reynaldo", "Villalobos", 8, 4);
       
