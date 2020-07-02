const assert = require('assert');

const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB())

describe('MongoDB strategy', function () {
    this.beforeAll(async function () {
        await context.connect()
    });

    it('MongoDB Connection', async function () {
        const result = await context.isConnected()
        const expected = 'Connected'
        assert.equal(result, expected)
    });
});