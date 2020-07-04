const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const Jwt = require('jsonwebtoken');

const BaseRoute = require('./base/baseRoute');
const PasswordHelper = require('../helpers/passwordHelper');

const failAction = (request, headers, error) => {
    throw error;
};

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super()
        this.db = db
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

                const [user] = await this.db.read({ username: username.toLowerCase() })
                if (!user) return Boom.unauthorized('User not exist!')

                const match = await PasswordHelper.comparePassword(password, user.password)
                if (!match) return Boom.unauthorized('Invalid user or password!')

                const token = Jwt.sign({
                    username,
                    id: user.id
                }, this.secret);

                return { 
                    token
                };
            }
        };
    };
};

module.exports = AuthRoutes;