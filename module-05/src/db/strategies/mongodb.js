const ICrud = require('./interfaces/interfaceCrud');

class MongoDB extends ICrud {
    constructor() {
        super()
    };

    create(item) {
        console.log('Item was saved in MongoDB')
    };
};

module.exports = MongoDB;