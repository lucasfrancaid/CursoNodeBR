const Joi = require('joi');
const Boom = require('boom');

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
                    return Boom.internal();
                };
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
                    return Boom.internal();
                };
            }
        };
    };

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        name: Joi.string().min(3).max(100),
                        skill: Joi.string().min(2).max(20)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const stringData = JSON.stringify(request.payload)
                    const data = JSON.parse(stringData)
                    
                    const result = await this.db.update(id, data)

                    if (result.nModified !== 1) return Boom.preconditionFailed('Hero not found!');
                    return { statusCode: result.statusCode, message: 'Hero was updated!' }

                } catch (error) {
                    console.error('Error', error)
                    return Boom.internal();
                };
            }
        }
    };

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const result = await this.db.delete(id)

                    if (result.n !== 1) return Boom.preconditionFailed('Hero not found!')
                    return { statusCode: result.statusCode, message: 'Hero was deleted!' }

                } catch (error) {
                    console.error('Error', error)
                    return Boom.internal();
                };
            }
        };
    };
};

module.exports = HeroesRoutes;