const Hapi = require('@hapi/hapi');

const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb');
const HeroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema');

const app = new Hapi.Server({
    port: 3333
});

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroesSchema))

    app.route([
        {
            path: '/heroes',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log('Listening on port', app.info.port)
};

main();