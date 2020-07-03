const assert = require('assert');

const api = require('../api');

let app;

describe.only('Suite of tests API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    });

    it('List /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.ok(Array.isArray(data))
        assert.deepEqual(statusCode, 200)
    });
});