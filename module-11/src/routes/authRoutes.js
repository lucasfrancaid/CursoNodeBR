const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Jwt = require('jsonwebtoken');

const BaseRoute = require('./base/baseRoute');

const failAction = (request, headers, error) => {
    throw error;
};

const USER = {
    username: 'admin',
    password: 'admin123'
}

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super()
        this.secret = secret
    };

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Get token',
                notes: 'Does login with user and password',
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload
                if (
                    username.toLowerCase() !== USER.username.toLowerCase() || 
                    password !== USER.password
                ) {
                    return Boom.unauthorized()
                };

                const token = Jwt.sign({
                    username,
                    id: 1
                }, this.secret);

                return { 
                    token
                };
            }
        };
    };
};

module.exports = AuthRoutes;