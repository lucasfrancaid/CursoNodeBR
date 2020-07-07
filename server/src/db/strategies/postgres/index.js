const Sequelize = require('sequelize');

const ICrud = require('../interfaces/interfaceCrud');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    };

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.log('Fail!', error)
            return false;
        };
    };

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        );
        await model.sync()
        return model;
    };

    static async connect() {
        const SSL_DB = process.env.SSL_DB === 'true' ? true : undefined
        const SSL_DB_REJECT = process.env.SSL_DB_REJECT === 'false' ? false : undefined
        
        let dialectOptions = {}
        if (SSL_DB) {
            dialectOptions = {
                ssl: {
                    require: SSL_DB,
                    rejectUnauthorized: SSL_DB_REJECT,
                }
            };
        };

        const connection = new Sequelize(process.env.POSTGRES_URL, {
            quoteIdentifiers: false,
            logging: false,
            dialectOptions,
        });
        
        return connection;
    };

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues;
    };

    async read(item = {}) {
        return await this._schema.findAll({ where: item, raw: true })
    };

    async update(id, item, upsert=false) {
        const method = upsert ? 'upsert' : 'update'
        return await this._schema[method](item, { where: { id: id } })
    };

    async delete(id) {
        const query = id ? { id } : {}
        return await this._schema.destroy({ where: query })
    };
};

module.exports = Postgres;