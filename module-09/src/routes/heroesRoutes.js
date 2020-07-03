const Joi = require('joi');

const BaseRoute = require('./base/baseRoute');

const failAction = (request, headers, error) => {
    throw error;
};

class HeroesRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    };

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(2).max(50)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, name } = request.query
                    const query = name ? { name: { $regex: `.*${name}*.` } } : {}
                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.error('Error', error)
                    return 'Intern server error!'
                }
            }
        };
    };

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        name: Joi.string().required().min(3).max(100),
                        skill: Joi.string().required().min(2).max(20)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { name, skill } = request.payload
                    return await this.db.create({ name, skill })
                } catch (error) {
                    console.error('Error', error)
                    return 'Internal server error!'
                }
            }
        };
    };
};

module.exports = HeroesRoutes;