const ICrud = require('./interfaces/interfaceCrud');

class Postgres extends ICrud {
    constructor() {
        super()
    };

    create(item) {
        console.log('Item was saved in Postgres')
    };
};

module.exports = Postgres;