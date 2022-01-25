const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");


// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    password: "rootroot",
    database: "employee_db",
  },
  console.log("Now connected to the employee database.")
);

// Opening list of choices for Inquirer
// const openingInquiry = [
//   {
//     type: "list",
//     message: "What would you like to do?",
//     name: "options",
//     choices: [
//       "View All Employees",
//       "Add Employee",
//       "Update Employee Role",
//       "View All Roles",
//       "Add Role",
//       "View All Departments",
//       "Add Department",
//       "Quit",
//     ],
//   }
// ];

// Starting Inquirer Prompts
function startInq() {
  inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "options",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  }
  ]).then(function (val) {
    switch (val.options) {
      case "View All Employees":
        allEmployees();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Update Employee Role":
        updateRole();
        break;

      case "View All Roles":
        allRoles();
        break;

      case "Add Role":
        addRole();
        break;

      case "View All Departments":
        viewDepartments();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Quit":
        db.end();
    }
  });
}

// View All Employees Selection
const allEmployees = () => {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, department.name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startInq();
    }
  );
};

// Adding Employees
const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter employee's first name",
      name: "firstName",
    },
    {
      type: "input",
      message: "Please enter employee's last name",
      name: "lastName",
    },
    {
      type: "list",
      message: "Please enter employee's role",
      choices: selectRole(),
      name: "role",
    },
    {
      type: "choice",
      message: "Who is their Manager",
      choices: selectManager(),
      name: "lastName",
    },
  ]);
};

// Setting up selectRole function from add Employee prompt
let totalRoles = [];
const selectRole = () => {
  db.query("SELECT * FROM roles;", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      totalRoles.push(res[i].title);
    }
  });
  return totalRoles;
};

// Setting up selectManager function from add Employee prompt
const totalManagers = [];
const selectManager = () => {
  db.query(
    "Select first_name, last_name FROM employees WHERE manager_id is NULL;",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        totalManagers.push(res[i].first_name);
      }
    }
  );
  return totalManagers;
};

// Update Employee Role
const updateRole = () => {
  db.query(
    "SELECT employees.first_name, employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            type: "list",
            choices: function () {
              let firstName = [];
              for (let i = 0; i < res.length; i++) {
                firstName.push(res[i].first_name);
              }
              return firstName;
            },
            message: "Please enter employee's first name",
            name: "firstName",
          },
          {
            type: "list",
            message: "Please enter employee's role",
            choices: selectRole(),
            name: "role",
          },
        ])
        .then(console.table(res));
      startInq();
    }
  );
};

// View All Roles
const allRoles = () => {
  db.query(
    "SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startInq();
    }
  );
};

// Add Role
const addRole = () => {
  db.query(
    "SELECT roles.title AS title, roles.salary AS salary FROM roles, department.name AS dept;",
    function (err, res) {
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the name of the role?",
            name: "roleTitle",
          },
          {
            type: "input",
            message: "What is the salary of the role?",
            name: "roleSalary",
          },
          {
            type: "input",
            message: "What department does this role belong to?",
            name: "roleDept",
          },
        ])
        //IS THIS POSSIBLE??
        .then(function (res) {
          db.query("INSERT INTO roles SET ?", {
            title: res.roleTitle,
            salary: res.roleSalary,
          })
          // db.query("INSERT INTO department SET ?", {
          //   name: res.roleDept,
          // }),
            function (err) {
              if (err) throw err;
              console.table(res);
              startInq();
            };
        });
    }
  );
};

// View All Departments
const viewDepartments = () => {
  db.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startInq();
  });
};

// Add Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department",
        name: "name",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startInq();
        }
      );
    });
};

startInq();
