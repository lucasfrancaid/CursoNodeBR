const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev', 'Invalid env, should be dev or prod');

const configPath = join(__dirname, '../../config', `.env.${env}`);
config({
    path: configPath
});

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision');
const HapiJwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');

const Context = require('../db/strategies/base/contextStrategy');
const MongoDB = require('../db/strategies/mongodb');
const Postgres = require('../db/strategies/postgres');

const UserSchema = require('../db/strategies/postgres/schemas/userSchema');
const HeroesSchema = require('../db/strategies/mongodb/schemas/heroesSchema');

const UtilRoutes = require('../routes/utilRoutes');
const AuthRoutes = require('../routes/authRoutes');
const HeroesRoutes = require('../routes/heroesRoutes');

const JWT_SECRET = process.env.JWT_KEY

const app = new Hapi.Server({
    port: process.env.PORT
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
};

async function main() {
    const connectionPostgres = await Postgres.connect()
    const userSchema = await Postgres.defineModel(connectionPostgres, UserSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, userSchema))
    
    const connection = MongoDB.connect()
    const contextMongoDB = new Context(new MongoDB(connection, HeroesSchema))

    const swaggerOptions = {
        info: {
            title: 'API Heroes - #CursoNodeBR',
            version: 'v1.0'
        }
    };

    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: async (data, request) => {
            const result = await contextPostgres.read({ id: data.id, username: data.username })
            if (!result) return {
                isValid: false
            };
            return {
                isValid: true
            };
        }
    });

    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods()),
        ...mapRoutes(new HeroesRoutes(contextMongoDB), HeroesRoutes.methods())
    ]);

    await app.start()
    console.log('Listening on port', app.info.port)

    return app;
};

module.exports = main();