const { deepEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_REGISTER = {
    name: 'Flash',
    skill: 'Speed',
    id: 1
};

describe('Suite of Heroes manipulation', () => {
    it('Should read a Hero, using files', async () => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await database.list(expected.id)
        deepEqual(result, expected)
    });
});