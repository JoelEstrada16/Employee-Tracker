const inquirer = require("inquirer");
const db = require("./db");

async function mainMenu() {
    console.table(
        "\nE-M-P-L-O-Y-E-E T-R-A-C-K-E-R\n"
    );

    inquirer
    .prompt({
        name: "action",
        type: "list",  
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Exit",
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();
                break;

            case "View All Departments":
                viewDepartments();
                break;

            case "View All Roles":
                viewRoles();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Exit":
                db.connection.end();
                return;
        }
    });
}

function viewEmployees(){
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewDepartments(){
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewRoles(){
    db.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function addEmployee(){
    db.query("SELECT * FROM role", (err, res) => {
        if(err){
            console.error(err);
            mainMenu();
        } else {
        inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: role.map((role) => role.title),
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: managers.map((manahger) => `${manager.first_name} ${manager.last_name}`),
            },
        ])
        .then((answer) => {
            const roleId = roles.find((role) => role.title === answer.role).id;
            const managerId = managers.find((manager) => `${manager.first_name} ${manager.last_name}` === answer.manager).id;
            db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [answer.first_name, answer.last_name, roleId, managerId],
                (err) => {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    mainMenu();
                }
            );
        });
    };
});
}

function addDepartment(){
    inquirer
    .prompt({
        name: "name",
        type: "input",
        message: "What is the name of the department?",
    })
    .then((answer) => {
        db.query(
            'INSERT INTO department (department_name) VALUES (?)',
            answer.name,
            (err, res) => {
                if(err){
                    console.error(err);
                } else{
                    console.log("Department added successfully!");
                    mainMenu();
                }
            }
        )
    })
}
