const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "output.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []
const arrayId = []

const createEmployee = () => {
    function newManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Email address?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Office Number?",
            },
            {
                type: "input",
                name: "managerGithub",
                message: "Github name?",
            },

        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.managerEmail, answers.officeManager, answers.managerGithub)
            teamMembers.push(manager)
            arrayId.push(answers.managerID)
            createTeam();
        })
        function createTeam(){
            inquirer.prompt([
                {
                    type: "list",
                    name: "memberChoice",
                    message: "Whats your new team members role?",
                    choices: [
                        "Engineer",
                        "Intern",
                        "No new entries to add"
                    ]
                }
        ]).then(chosen => {
            switch (chosen.memberChoice) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    createTeam();
            }
        }
        )
        function createEngineer() {
            inquirer.prompt([
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is your engineer's name",
                    validate: answer => {
                        if(answer !== "") {
                            return true
                        }
    
                        return "Please enter a valid name"
                    }
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is your engineers's ID?",
                    validate: answer => {
                        if(answer !== "") {
                            return true
                        }
    
                        return "Please enter a valid ID"
                    }
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is your engineer's email?",
                    validate: answer => {
                        if(answer !== "") {
                            return true
                        }
    
                        return "Please enter a valid email"
                    }
                },
                {
                    type: "input",
                    name: "engineerGithub",
                    message: "What is your engineer's Github?",
                    validate: answer => {
                        if(answer !== "") {
                            return true
                        }
    
                        return "Please enter a valid github"
                    }
                }
            ]).then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
                teamMembers.push(engineer)
                arrayId.push(answers.engineerId)
                createTeam();
            })
        }
        function createIntern() {
            inquirer.prompt([
                {
                    type: "input",
                    name: "internName",
                    message: "What is the Intern's name?",
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is the intern's email address?"
                },
                {
                    type: "input",
                    name: "internID",
                    message: "What is the school ID?",
                },
                {
                    type: "input",
                    name: "internSchool",
                    message: "What is the college name?",
                }
            ]).then((answers) => {
                const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
                teamMembers.push(intern)
                arrayID.push(answers.internID)
                createTeam();
            })
        }
    } 
    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      }
    }
newManager();

}

createEmployee();
