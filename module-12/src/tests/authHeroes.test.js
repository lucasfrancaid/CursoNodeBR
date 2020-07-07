const assert = require('assert');
const api = require('../api');

const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres');
const UserSchema = require('../db/strategies/postgres/schemas/userSchema');

const USER = {
    username: 'admin',
    password: '123'    
};

const USER_DB = {
    ...USER,
    password: '$2b$04$F9F82IkkCMlPpUbGUTfgH.X2PjoblF7hD4NmofmTTf0UKKfXnCWSy'
};

let app;

describe('Suite of tests Auth Route', function () {
    this.timeout(Infinity);
    this.beforeAll(async function () {
        app = await api

        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, UserSchema)
        const context = new Context(new Postgres(connection, model))
        await context.update(null, USER_DB, true)
    });

    it('Should get a token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 200)
        assert.ok(payload.token.length > 10)
    });

    it('Should return unauthorized if trying to get a wrong login', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'lucasfranca',
                password: '123'
            }
        });
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 401)
        assert.deepEqual(payload.error, 'Unauthorized')
    });
});