const { deepEqual } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CREATE = {
    name: 'Flash',
    skill: 'Speed',
    id: 1
};

const DEFAULT_ITEM_UPDATE = {
    name: 'Superman',
    skill: 'Super Power',
    id: 2
};

describe('Suite of Heroes manipulation', () => {
    before(async () => {
        await database.create(DEFAULT_ITEM_CREATE)
        await database.create(DEFAULT_ITEM_UPDATE)
    });

    it('Should read a Hero, using files', async () => {
        const expected = DEFAULT_ITEM_CREATE
        const [result] = await database.list(expected.id)
        deepEqual(result, expected)
    });

    it('Should create a Hero, using files', async () => {
        const expected = DEFAULT_ITEM_CREATE
        await database.create(DEFAULT_ITEM_CREATE)
        const [actual] = await database.list(DEFAULT_ITEM_CREATE.id)
        deepEqual(actual, expected)
    })

    it('Should remove a Hero by id, using files', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_ITEM_CREATE.id)
        deepEqual(result, expected);
    });

    it('Should update a Hero by id, using files', async () => {
        const expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Batman',
            skill: 'Money'
        }
        const newData = {
            name: 'Batman',
            skill: 'Money'
        }
        await database.update(DEFAULT_ITEM_UPDATE.id, newData)
        const [result] = await database.list(DEFAULT_ITEM_UPDATE.id)
        deepEqual(result, expected)
    });

    after(async () => {
        await database.remove(DEFAULT_ITEM_CREATE.id)
        await database.remove(DEFAULT_ITEM_UPDATE.id)
    });
});