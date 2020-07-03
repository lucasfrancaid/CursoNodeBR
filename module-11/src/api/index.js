const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision');
const HapiJwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');

const Context = require('../db/strategies/base/contextStrategy');
const MongoDB = require('../db/strategies/mongodb');

const AuthRoutes = require('../routes/authRoutes');
const HeroesSchema = require('../db/strategies/mongodb/schemas/heroesSchema');
const HeroesRoutes = require('../routes/heroesRoutes');

const JWT_SECRET = 'SECRET_KEY'

const app = new Hapi.Server({
    port: 3333
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
};

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroesSchema))

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
        // options: {
        //     expiresIn: 20
        // },
        validate: (data, request) => {
            return {
                isValid: true
            };
        }
    });

    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods()),
        ...mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods())
    ]);

    await app.start()
    console.log('Listening on port', app.info.port)

    return app;
};

module.exports = main();