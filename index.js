// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require("fs");
const generateMarkdown = require('./utils/generateMarkdown.js');
// const Sentry = require("@Sentry/node");
// const Tracing = require("@Sentry/tracing");

// Sentry.init({
//     dsn: "https://4fd2532bbdee4c0fa2bc4fed5bdfc5fa@o1152802.ingest.sentry.io/6231188",
//     tracesSampleRate: 1.0,
// });

// const transaction = Sentry.startTransaction({
//     op: "test",
//     name: "My first test transaction",
// });

// setTimeout(() => {
//     try {
//         foo();
//     } catch (e) {
//         Sentry.captureException(e);
//     } finally {
//         transaction.finish();
//     }
// });

// TODO: Create an array of questions for user input
const questions = [
// title
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter a title for your project!');
                return false;
            }
        }
    },
    // github username
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub Username?',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub Username!');
                return false;
            }
        }
    },
    // repo name
    {
        type: 'input',
        name: 'repo',
        message: 'What is the name of your repo?',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please enter a repo name!');
                return false;
            }
        }
    },
    // project description
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your application?',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a description for the application!');
                return false;
            }
        }
    },
    // how to use application
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use this application? Please be specific.',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide usage instructions for this application!');
                return false;
            }
        }
    },
    // check boxes for adding sections to readme file
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Would you like to add any additional sections to the README file? Select all that apply!',
        choices: [
            {
                name: 'Deployed Application',
                checked: false
            },
            {
                name: 'Installation',
                checked: false
            },
            {
                name: 'screenshots',
                checked: true
            },
            {
                name: 'built with',
                checked: true
            },
            {
                name: 'license',
                checked: false
            },
            {
                name: 'contributing',
                checked: false
            },
            {
                name: 'tests',
                checked: false
            },
            {
                name: 'questions',
                checked: true
            },
            {
                name: 'credits',
                checked: true
            }
        ]
    },
    // link to deployed application
    {
        type: 'input',
        name: 'link',
        message: 'Provide a link to your application!',
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please provide a link to your deployed application:');
                return false;
            }
        }
    },
    // what do you need to install to make application work?
    {
        type: 'input',
        name: 'installation',
        message: 'What tool do you need to install for this application to work?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Enter which tool you need to run this app:');
                return false;
            }
        }
    },
    // licenses
    {
        type: 'list',
        name: 'license',
        message: 'Provide license information here.',
        choices: ['MIT', 'Apache', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Select which license was used here.');
                return false;
            }
        }
    },
    // built with
    {
        type: 'checkbox',
        name: 'built with',
        message: 'what was this application built with? Check all that apply.',
        choices: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'ES6', 'Bootstrap', 'jQuery', 'Python', 'React.js'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Built With') > -1) {
                return true;
            } else {
                return false;
            }
        }
    },
// contributing
    {
        type: 'input',
        name: 'contributing',
        message: 'Tell us how we can contribute!',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please tell us how we can contribute: ')
                return false;
            }
        }
    },
// Tests
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test information for application here: ',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('Enter test information here please: ');
                return false;
            }
        }
     },
     // additional questions
     {
         type: 'input',
         name: 'question',
         message: 'Please provide an email address so someone can reach you: ',
         when: ({ contents }) => {
             if (contents.indexOf('Question') > -1) {
                 return true;
             } else {
                 return false;
             }
         },
         validate: questionInput => {
             if (questionInput) {
                 return true;
             } else {
                 console.log('Provide an email address here: ');
                 return false;
             }
         }
     },
    ];
// screenshot array function
const screenshotQuestion = [
    {
        type: 'input',
        name: 'linkToScreenshot',
        message: 'Provide a link to a screenshot here: ',
        validate: linkToScreenshotInput => {
            if (linkToScreenshotInput) {
                return true;
            } else {
                console.log('Link your screenshot here: ');
                return false;
            }
        }
    },
    // to add an alt to a screenshot for accessibility purposes
    {
        type: 'input',
        name: 'addAltToScreenshot',
        message: 'Add alternative text to screenshot: ',
        validate: addAltToScreenshotInput => {
            if (addAltToScreenshotInput) {
                return true;
            } else {
                console.log('Please enter the screenshot alternate text here: ');
                return false;
            }
        }
    },
    // optionally add a description to a screenshot
    {
        type: 'input',
        name: 'descriptionOfScreenshot',
        message: "Optionally add a description here: "
    },
    // confirmation for another screenshot
    {
        type: 'confirm',
        name: 'addScreenshotConfirmation',
        message: 'Would you like to add another screenshot?',
        default: false
    }
];

// Creation of the credits array
const creditArr = [
    // credit name
    {
        type: 'input',
        name: 'nameCredits',
        message: 'Add the name of the credited person here: ',
        validate: nameCreditsInput => {
            if (nameCreditsInput) {
                return true;
            } else {
                console.log('Give your developer some credit!');
                return false;
            }
        }
    },
    // Link to credits' GitHub
    {
        type: 'input',
        name: 'linkCredit',
        message: "Provide a link for your credited developer's GitHub",
        validate: linkCreditInput => {
            if (linkCreditInput) {
                return true;
            } else {
                console.log("What is your developer's name?");
                return false;
            }
        }
    },
    // add additional credits confirmation
    {
        type: 'confirm',
        name: 'addAdditionalCredits',
        message: 'Would you like to add another developer to the credits?',
        default: false
    }
]

// this function adds a new screenshot to the readme
screenshotAdd = readmeData => {

    // creates a screenshots array if one doesn't exist
    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }
    console.log(`
    ==================
    Add New Screenshot
    ==================
    `)
    return inquirer.prompt(questionScreenshots)
    .then(screenshotData => {
        // adds screenshot to array
        readmeData.screenshots.push(screenshotData);
        // calls the function again dependent on user input
        if (screenshotAdd.confirmAddScreenshot) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
    };
    // Function to add additional credits to your readme file
    creditAdd = readmeInfo => {
        // credit array creation in case one doesn't exist
        if(readmeInfo.credit) {
            readmeInfo.credit = [];
        };
        console.log(`
        ==================
        Add New Credit!
        ==================
        `);
        return inquirer.prompt(creditAddQuestions)
        .then(dataCredit => {
            readmeData.credit.push(dataCredit);
            if (creditAdd.confirmAddCredit) {
                return addCredit(readmeData);
            } else {
                return readmeData;
            };
        });
    };

// TODO: Create a function to write README file
    function writeToFile(fileName, data) {
        fs.writeFile(`./dist/${fileName}`, data, err => {
            if (err) {
                throw err
            };
            console.log('README.md created successfully! Check the readme file in the directory to see it!')
        });
    };

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
    .then(userResponse => {
        // this adds the screenshots from user selection to readme
        if (userResponse.contents.indexOf('Screenshots') > -1) {
            return addScreenshots(userResponse);
        } else {
            return userResponse;
        }
    })
    .then(response => {
        if (response.contents.indexOf('Credits') > -1) {
            return addCredits(response);
        } else {
            return response;
        }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
