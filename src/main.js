const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fileUtil = require('./fileUtil');
const gitUtil = require('./gitUtil');
const credentialPrompt = require('./credentialPrompt');

clear();
console.log(chalk.yellow(figlet.textSync('Ginit', { horizontalLayout: 'full' })));

gitUtil.ensureNotGitDirectory(fileUtil.getCurrentDirectory());

const askForCreds = async () => {
    const creds = await credentialPrompt.askGitHubCredentials();
    console.log(creds);
};

askForCreds();
