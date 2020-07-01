const Sequelize = require('sequelize');

const ICrud = require('./interfaces/interfaceCrud');

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    };

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('Fail!', error)
            return false;
        };
    };

    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            skill: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        });
    
        await this._heroes.sync()
    };

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'lucasfranca',
            'lucasfranca',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false
            }
        );

        await this.defineModel();
    };

    async create(item) {
        const { dataValues } = await this._heroes.create(item)
        return dataValues;
    };
};

module.exports = Postgres;