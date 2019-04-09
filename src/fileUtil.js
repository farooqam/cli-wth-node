const fs = require('fs');

module.exports = {
    getCurrentDirectory: () => process.cwd(),

    directoryExists: (directoryPath) => {
        try {
            return fs.statSync(directoryPath).isDirectory();
        } catch (err) {
            return false;
        }
    },
};
