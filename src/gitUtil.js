const chalk = require('chalk');
const path = require('path');
const fileUtil = require('./fileUtil');

module.exports = {
    ensureNotGitDirectory: (directoryPath) => {
        if (fileUtil.directoryExists(path.join(directoryPath, '.git'))) {
            console.log(chalk.red(`'${directoryPath}' is already a git repository.`));
            process.exit();
        }
    },
};
