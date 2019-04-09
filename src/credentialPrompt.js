const inquirer = require('inquirer');

module.exports = {
    askGitHubCredentials: () => {
        const questions = [
            {
                name: 'GitHub username',
                type: 'input',
                message: 'Enter your GitHub username:',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    }

                    return 'Enter your GitHub username.';
                },
            },
            {
                name: 'GitHub password',
                type: 'password',
                message: 'Enter your GitHub password:',
                validate(value) {
                    if (value.length) {
                        return true;
                    }

                    return 'Enter your GitHub password.';
                },
            },
        ];

        return inquirer.prompt(questions);
    },
};
