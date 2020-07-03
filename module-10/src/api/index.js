const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');


const Context = require('../db/strategies/base/contextStrategy');
const MongoDB = require('../db/strategies/mongodb');
const HeroesSchema = require('../db/strategies/mongodb/schemas/heroesSchema');
const HeroesRoutes = require('../routes/heroesRoutes');

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
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.route(
        mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods())
    );

    await app.start()
    console.log('Listening on port', app.info.port)

    return app;
};

module.exports = main();