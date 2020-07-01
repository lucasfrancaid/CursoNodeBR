const assert = require('assert');

const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres())

const MOCK_HERO_CREATE = {
    name: 'Wonder Woman',
    skill: 'Power'
};

describe('Postgres strategy', function () {
    this.timeout(Infinity);
    this.beforeAll(async function () {
        await context.connect()
    })

    it('Postgres Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    });

    it('Should create a Hero', async function () {
        const result = await context.create(MOCK_HERO_CREATE)
        delete result.id
        assert.deepEqual(result, MOCK_HERO_CREATE)
    });
});