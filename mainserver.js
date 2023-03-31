const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"root",
	database:"employee_db"
})

connection.connect(function(err){
	if (err) throw err;
	console.log("Connected sucessfully");
	start();
})

function addDepartment(){
	console.log("In addDepartment");
	inquirer.prompt({
		type:"input",
		message:"Type Name of the Department : ",
		name:"dept_name"
	}).then(
	function(answer)
	{
		connection.query("INSERT INTO department (name) VALUES (?)",[answer.dept_name],
			function(err,res){
				if(err) throw err;
				start();
			})
	})

	
}

function viewDepartments()
{
	let query = "SELECT * FROM department";
	connection.query(query,function(err,res){
		if(err) throw err;
		console.table(res);
		start();

	})
}

function addRole(){
	console.log("In addRole");
	inquirer.prompt(
	[
	{
		type:"input",
		message:"Please type name of the role : ",
		name : "role_name",
	},
	{
		type:"input",
		message:"Salary for this role? ",
		name:"salary"
	},
	{
		type:"input",
		message:"What is the department id for this role?",
		name:"dept_id"
	}]
	)
	.then(function(answer){
		connection.query("INSERT INTO role (title,salary,department_id) VALUES (?,?,?)",[answer.role_name,answer.salary,answer.dept_id],
			function(err,res){
				if(err) throw err;
				start();
			}

			)
	})



}
function viewRoles()
{
	let query = "SELECT * FROM role";
	connection.query(query,function(err,res){
		if(err) throw err;
		console.table(res);
		start();

	})
}

function addEmployee(){

	inquirer.prompt(
	[
	{
		type:"input",
		message:"Please type employee's first name : ",
		name : "fname",
	},
	{
		type:"input",
		message:"Please type employee's last name ",
		name:"lname"
	},
	{
		type:"input",
		message:"What is the Role id ? ",
		name:"role_id"
	},
	{
		type:"input",
		message:"What is the Manager id ? ",
		name:"manager_id"
	}]
	)
	.then(function(answer){
		connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)",[answer.fname,answer.lname,answer.role_id,answer.manager_id],
			function(err,res){
				if(err) throw err;
				start();
			}

			)
	})

}

function viewEmployees()
{
	let query = "SELECT * FROM employee";
	connection.query(query,function(err,res){
		if(err) throw err;
		console.table(res);
		start();

	})
}

function update()
{
	inquirer.prompt([{
		type:"input",
		message:"Which employee would you like to update?",
		name:"fname_update"
		},
		{
			type:"input",
			message:"what's the new role id?",
			name:"new_role"
		}


	]).then(function(answer){
		connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?",[answer.new_role,answer.fname_update],
			function(err,res){
				if(err) throw err;
				start();
			}
		 )
	})
}
function start()
{
	inquirer.prompt({
		type:"list",
		choices : ["Add Department","Add Role","Add Employee","View all departments","View all roles","View all employees","Update and employee role","Quit"],
		message:"Choose any one option",
		name:"option"


	}).then(function(result){
		console.log("You chose : "+result.option);
		switch(result.option){
			case "Add Department":
				addDepartment();
				break;
			case "Add Role":
				addRole();
				break;
			case "Add Employee":
				addEmployee();
				break;
			case "View all departments":
				viewDepartments();
				break;
			case "View all roles":
				viewRoles();
				break;
			case "View all employees":
				viewEmployees();
				break;
			case "Update and employee role":
				update();
				break;
			default:
				quit();

		} 




	})
}





