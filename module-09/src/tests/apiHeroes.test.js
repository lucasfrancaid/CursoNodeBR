const assert = require('assert');
const api = require('../api');

let app;

describe('Suite of tests API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    });

    it('List /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    });

    it('List /heroes - should return only 3 items', async () => {
        const LIMIT = 3
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT}`
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(data.length === LIMIT)
    });

    it('List /heroes - should return error by incorrect limit', async () => {
        const LIMIT = 'AEIOU'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT}`
        })
        assert.deepEqual(result.payload, 'Intern server error!')
    });

    it('List /heroes - should filter an item', async () => {
        const LIMIT = 5
        const NAME = 'Batman'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT}&name=${NAME}`
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(data[0].name, NAME)
    });
});