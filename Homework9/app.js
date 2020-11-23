const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []
const arrayId = []

function mainPage() {

    makeTeam();

    function  makeTeam(){
        inquirer.prompt([
            {
               type: "list",
               name: "team",
               message: "Which team member would you like to add?",
               choices: ["Manager", "Engineer", "Intern", "exit"]
               

               
               
            }
        ]).then(answer => {
            if (answer.team === "Engineer") {
                makeEngineer();
            }
            else if (answer.team === "Manager") {
                makeManager();
            }
            else if (answer.team === "Intern") {
                makeIntern();
            }
            else if (answer.team === "exit") {
                buildTeam();
            }

        })
    } 
    function makeManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid name"
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's ID?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid ID"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid email"
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid number"
                }
            }
        ]).then(answers => {
            const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager)
            arrayId.push(answers.managerId)
            
            makeTeam();
        })

    }

    function makeEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
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
                message: "What is your employee's ID?",
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
                message: "What is your employee's email?",
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
                message: "What is your employee's Github?",
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
            
            makeTeam();
           
        })
    }

    function makeIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your Intern's name",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid name"
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's ID?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid ID"
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid email"
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school has your intern attended?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid school"
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            arrayId.push(answers.internId)
            
            makeTeam();
          
        })
        
    }

    function buildTeam() {
        
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      }

      
}

mainPage()


