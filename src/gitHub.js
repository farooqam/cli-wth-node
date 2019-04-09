const octokit = require('@octokit/rest');
const ConfigStore = require('configstore');
const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
const chalk = require('chalk');
const credentialPrompt = require('./credentialPrompt');

const conf = new ConfigStore(pkg.name);
const Spinner = CLI.Spinner;

module.exports = {
    getInstance: () => octokit,

    getStoredGitHubToken: () => conf.get('github.token'),

    setGitHubCredentials: async () => {
        const credentials = await credentialPrompt.askGitHubCredentials();

        octokit.authenticate(
            _.extend(
                {
                    type: 'basic',
                },
                credentials,
            ),
        );
    },

    registerNewToken: async () => {
        const status = new Spinner('Authenticating. Please wait...');
        status.start();

        try {
            const response = await octokit.authorization.create({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'GitInit - the command line tool for initializing GitHub repos.'
            });

            const { token } = response.data;

            if (token) {
                conf.set('github.token', token);
                return token;
            }

            throw new Error('GitHub token was not found in the response.');
        } catch (err) {
            throw err;
        } finally {
            status.stop();
        }
    },
};
