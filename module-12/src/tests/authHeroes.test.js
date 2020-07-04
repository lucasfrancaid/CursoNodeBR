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

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await Postgres.connect()
        const userSchema = await Postgres.defineModel(connectionPostgres, UserSchema)
        const contextPostgres = new Context(new Postgres(connectionPostgres, userSchema))
        await contextPostgres.update(null, USER_DB, true)
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