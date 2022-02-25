// I'm going to attempt to refactor code here.

// generates the license badge based on user input, or it will be blank if no input
const renderLicenseBadge = license => {
  if (license) {
    return `![${license} License](https:shields.io/license-${license.split(' ').join('%20')}-blue)
    `;
  } else {
    return '';
  }
};
// generates the description section in readme
  const renderLicenseSection = (title, description, link) => {
  if (link) {
    return `${description}

    View the deployed page at [${title}](${link})`;
  } else {
    return `${description}`;
  }
};
// Create a table of contents
const renderTableOfContents = contentsArr => {
  // content list items appear based on user input
  let listContents = '';
  contentsArr.forEach((item) => {

    // indents screenshots
    if (item.content && item.header === 'Screenshots') {
      listContents += `  * [${item.header}](#${(item.header).toLowerCase()})
      `;
    } else if (item.content) {
      listContents += `* [${item.header}](#${(item.header).toLowerCase().split(' ').join('-')})
      `;
    }
  });
  // stops the function returning the table of contents
  return listContents;
};
// Renders an installation guide
const renderInstallationGuide = installation => {
  if (installation) {
    return `To use this application, please install:
    \`\`\`
    ${installation}
    \`\`\``
  } else {
    return '';
  }
};
// Renders screenshot sections
const renderScreenshot = screenshotObj => {
  let screenshotArr = '';
  if (screenshotObj) {
    screenshotObj.forEach(shot => {
    screenshotArr += `[!${shot.addAltToScreenshotInput}](${shot.linkToScreenshot})
    ${shot.descScreenshot}
    `;
    });
    return `${screenshotArr}`;
  } else {
    return '';
  }
};
// renders built with section
const renderBuiltWith = builtWith => {
  let allTech = '';

  if (builtWith) {
    bultWith.forEach(item => {
      allTech += `
    * ${item}`
    });
    return `${allTech}`;
  } else {
    return '';
  };
};
// renders usage section
const renderUsageSection = (usageInput, screenshots) => {
  return `${usageInput} ${screenshotCreation(screenshots)}`
};

// renders license section
const renderLicensesSection = licenses => {
  if (licenses) {
    return `This application is licensed under the ${licenses} license.`;
  } else {
    return '';
  }
};
// creates how to test section
const renderTests = tests => {
  if (tests) {
    return `To run tests on this application, install
    \`\`\`
    ${tests}
    \`\`\`
    and run \`npm run test\` from the command line.`
  } else {
    return '';
  };
};
// renders a questions section
const renderQuestions = (email, github, repo) => {
  // requests an email address
  if (email) {
    return `If you have any questions about the repo, please [open an issue](https://github.com/${github}/${repo}/issues) or contact me via email at ${email}. You can find more of my work on my GitHub, [${github}](https://github.com/${github}/.)`
  } else {
    return '';
  }
};

// credits section
const renderCredits = creditsItem => {
  let creditsArr = '';
  if (creditsItem) {
    creditsItem.forEach((credit) => {
      creditsArr += `* [${credit.creditNames}](${credit.creditsLink})
  `;
    });
    return creditsArr;
  } else {
    return '';
  }
};
// generate markdown
function generateMarkdown(data) {
  const { title, github, repo, license } = data;
  let readmeContent = '';
  const sectionsArr = [
    {
      header: 'Installation',
      content: createInstallation(data.installation)
    },
    {
      header: 'Usage',
      content: createUsage(data.usage)
    },
    {
      header: 'Screenshots',
      content: createScreenshots(data.screenshots)
    },
    {
      header: 'Built With',
      content: createBuiltWith(data['built with'])
    },
    {
      header: 'License',
      contennt: createLicense(license)
    },
    {
      header: 'Contributing',
      content: data.contributing
    },
    {
      header: 'Tests',
      content: createTest(data.tests)
    },
    {
      header: 'Questions',
      content: createQuestions(data.questions, github, repo)
    },
    {
      header: 'Credits',
      content: createCredits(data.credits)
    },
  ];

  // adds each section dependents on if there are contents in each section
  sectionsArr.forEach((sectionItem) => {
    if (sectionItem.content && sectionItem.header === 'Screenshots') {
      readmeContent += `### ${sectionItem.header}
    ${sectionItem.content}
    `
        } else if (sectionItem.content) {
          readmeContents += `## ${sectionItem.header}
        ${sectionItem.content}

        `;
              }
  });
  return `# ${title}
[![Issues](https://img.shields.io/github/issues/${github}/${
  repo
})](https://github.com/${github}/${
  repo
}/issues) [![Issues](https://img.shields.io/github/contributers/${
  github
}/${repo})](https://github.com/${github}/${
  repo
}/graphs/contributers ${addLicenseBadge(license)}
## Description
${createDescription(title, data.description, data.link)}
## Contents
${createTableofContents(sectionsArr)}
${readmeContent}`;
}

// Exports generateMarkdown as a module for index.js
module.exports = generateMarkdown;

// // TODO: Create a function that returns a license badge based on which license is passed in
// // If there is no license, return an empty string
// //Below, and on the other lines that start with function are commented out for reference, it will be replaced with const. This doesn't apply to all lines, only for rendering the licenses and doingb the markdown generation
// // function renderLicenseBadge(license) {}
// const renderLicenseBadge = license => {
//   if (license) {
//     return `![${license} License](https://shields.io/license-${license.split(' ').join('%20')}-blue)
//     `;
//   } else {
//     return '';
//   }
// }

// // TODO: Create a function that returns the license link
// // If there is no license, return an empty string
// // function renderLicenseLink(license) {}
// const renderLicenseLink = license => {}

// // TODO: Create a function that returns the license section of README
// // If there is no license, return an empty string
// // function renderLicenseSection(license) {}
// const renderLicenseSection = license => {}

// // TODO: Create a function to generate markdown for README
// // function generateMarkdown(data) {
// //   return `# ${data.title}

// // `;
// // }
// const generateMarkdown = data => {}

// module.exports = generateMarkdown;

// # <Your-Project-Title>

// ## Description

// Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

// - What was your motivation?
// - Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
// - What problem does it solve?
// - What did you learn?

// ## Table of Contents (Optional)

// If your README is long, add a table of contents to make it easy for users to find what they need.

// - [Installation](#installation)
// - [Usage](#usage)
// - [Credits](#credits)
// - [License](#license)

// ## Installation

// What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

// ## Usage

// Provide instructions and examples for use. Include screenshots as needed.

// To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

//     ```md
//     ![alt text](assets/images/screenshot.png)
//     ```

// ## Credits

// List your collaborators, if any, with links to their GitHub profiles.

// If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

// If you followed tutorials, include links to those here as well.

// ## License

// The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

// ---

// 🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

// ## Badges

// ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

// Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

// ## Features

// If your project has a lot of features, list them here.

// ## How to Contribute

// If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

// ## Tests

// Go the extra mile and write tests for your application. Then provide examples on how to run them here.