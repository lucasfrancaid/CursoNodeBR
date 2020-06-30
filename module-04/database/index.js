const { readFile } = require('fs');
const { promisify } = require('util');

// Simulating to learn handle other files
const readFileAsync = promisify(readFile);

// Other way for get data of the json file
// const jsonData = require('./heroes.json'); 

class Database {
    constructor() {
        this.FILE_NAME = './database/heroes.json'
    };
    async getFileData() {
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString());
    };
    writeFile() {

    }
    async list(id) {
        const data = await this.getFileData()
        const filteredData = data.filter(item => id ? item.id === id : true)
        return filteredData;
    };
};

module.exports = new Database();