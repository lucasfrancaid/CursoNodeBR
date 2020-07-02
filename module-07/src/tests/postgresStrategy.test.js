const assert = require('assert');

const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres())

const MOCK_HERO_CREATE = {
    name: 'Wonder Woman',
    skill: 'Power'
};

const MOCK_HERO_UPDATE = {
    name: 'Superman',
    skill: 'Power'
};

describe('Postgres strategy', function () {
    this.timeout(Infinity);
    this.beforeAll(async function () {
        await context.connect()
    });

    it('Postgres Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    });

    it('Should create a Hero', async function () {
        const result = await context.create(MOCK_HERO_CREATE)
        delete result.id
        assert.deepEqual(result, MOCK_HERO_CREATE)
    });

    it('Should read a Hero by name', async function () {
        const [result] = await context.read({ name: MOCK_HERO_CREATE.name })
        delete result.id
        assert.deepEqual(result, MOCK_HERO_CREATE)
    });

    it('Should update a Hero by id', async function () {
        const [itemToUpdate] = await context.read({ name: MOCK_HERO_CREATE.name })
        const [result] = await context.update(itemToUpdate.id, MOCK_HERO_UPDATE)
        const [updatedItem] = result === 1 ? await context.read({ id: itemToUpdate.id }) : null
        if (updatedItem) delete updatedItem.id
        assert.deepEqual(updatedItem, MOCK_HERO_UPDATE)
    });

    it('Should delete a Hero by id', async function () {
        const [item] = await context.read({ name: MOCK_HERO_UPDATE.name })
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    });
});