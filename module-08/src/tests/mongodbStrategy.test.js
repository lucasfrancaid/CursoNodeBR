const assert = require('assert');

const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB())

const MOCK_HERO_CREATE = {
    name: 'Wonder Woman',
    skill: 'Lasso of Truth'
};

let MOCK_HERO_ID;

const MOCK_HERO_UPDATE = {
    name: 'Superman',
};

describe('MongoDB strategy', function () {
    // this.timeout(Infinity);
    this.beforeAll(async () => {
        await context.connect()
    });

    it('MongoDB Connection', async () => {
        const result = await context.isConnected()
        const expected = 'Connected'
        assert.equal(result, expected)
    });

    it('Should create a Hero', async () => {
        const { _id, name, skill } = await context.create(MOCK_HERO_CREATE)
        MOCK_HERO_ID = _id
        assert.deepEqual({ name, skill }, MOCK_HERO_CREATE)
    });

    it('Should read a Hero by name', async () => {
        const [{ name, skill }] = await context.read({ name: MOCK_HERO_CREATE.name, skill: MOCK_HERO_CREATE.skill })
        assert.deepEqual({ name, skill }, MOCK_HERO_CREATE)
    });

    it('Should update a Hero by id', async () => {
        const result = await context.update(MOCK_HERO_ID, MOCK_HERO_UPDATE)
        assert.deepEqual(result.nModified, 1)
    });

    it('Should delete a Hero by id', async () => {
        const result = await context.delete(MOCK_HERO_ID)
        assert.deepEqual(result.n, 1)
    });
});