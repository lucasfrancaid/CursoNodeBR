const { deepEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CREATE = {
    name: 'Flash',
    skill: 'Speed',
    id: 1
};

describe('Suite of Heroes manipulation', () => {
    before(async () => {
        await database.create(DEFAULT_ITEM_CREATE)
    });

    it('Should read a Hero, using files', async () => {
        const expected = DEFAULT_ITEM_CREATE
        const [result] = await database.list(expected.id)
        deepEqual(result, expected)
    });

    it('Should create a Hero, using files', async () => {
        const expected = DEFAULT_ITEM_CREATE
        const result = await database.create(DEFAULT_ITEM_CREATE)
        const [actual] = await database.list(DEFAULT_ITEM_CREATE.id)
        deepEqual(actual, expected)
    })
});