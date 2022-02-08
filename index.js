const inquirer = require('inquirer');
const fs = require('fs');
const generateHtml = require('./util/generateHtml');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

//An array of the team members
const team = []
//Questions for a manager
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the managers name.'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the managers ID number.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the managers email.'
    },
    {
        type: 'input',
        name: 'office',
        message: 'Please enter the managers office number.'
    }
]

//Questions for a engineer

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the engineers name.'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the engineer ID number.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the engineers email.'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter the managers engineers gitHub.'
    }
]

//Questions for an intern

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the intern name.'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the intern ID number.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the intern email.'
    },
    {
        type: 'input',
        name: 'school',
        message: 'Please enter the intern school.'
    }
]

const mainQuestions = [
    {
        type: 'list',
        name: 'mainQuestions',
        message: 'What would you like to do?',
        choices: ['Add an engineer', 'Add an intern', 'View team']
    }
]


//Asked the passed questions when called
function askQuestions(questions){
    inquirer.prompt(questions).then(answers => {
        if (answers.mainQuestions == 'Add an engineer') {
            inquirer.prompt(engineerQuestions).then(answers => {
                engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                team.push(engineer)
                return askQuestions(mainQuestions)})
        }else if (answers.mainQuestions == 'Add an intern') {
            inquirer.prompt(internQuestions).then(answers => {
                intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                team.push(intern);
                return askQuestions(mainQuestions)})
        } else if (answers.mainQuestions == 'View team') {
            fs.writeFile('MyTeam.html', generateHtml(team), err => {
                err ? console.log(err) : console.log('Created!');
            });
        }
    })
}

//Starts off the process by gathering the managers answers
function main(){
    inquirer.prompt(managerQuestions).then(answers => {
        manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        team.push(manager)
        return askQuestions(mainQuestions);
    })
}

main();