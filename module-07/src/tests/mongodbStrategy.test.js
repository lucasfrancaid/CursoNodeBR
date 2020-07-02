const assert = require('assert');

const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB())

const MOCK_HERO_CREATE = {
    name: 'Wonder Woman',
    skill: 'Lasso of Truth'
};

describe('MongoDB strategy', function () {
    this.beforeAll(async () => {
        await context.connect()
    });

    it('MongoDB Connection', async () => {
        const result = await context.isConnected()
        const expected = 'Connected'
        assert.equal(result, expected)
    });

    it('Should create a Hero', async () => {
        const { name, skill } = await context.create(MOCK_HERO_CREATE)
        assert.deepEqual({ name, skill }, MOCK_HERO_CREATE)
    });

    it('Should read a Hero by name', async () => {
        const [{ name, skill }] = await context.read({ name: MOCK_HERO_CREATE.name, skill: MOCK_HERO_CREATE.skill })
        assert.deepEqual({ name, skill }, MOCK_HERO_CREATE)
    });
});