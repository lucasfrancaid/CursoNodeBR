const Joi = require('joi');

const BaseRoute = require('./base/baseRoute');

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
                    failAction: (request, headers, error) => {
                        throw error;
                    },
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
};

module.exports = HeroesRoutes;