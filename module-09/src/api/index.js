const Hapi = require('hapi');

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

    app.route([
        ...mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods())
    ])

    await app.start()
    console.log('Listening on port', app.info.port)

    return app;
};

module.exports = main();