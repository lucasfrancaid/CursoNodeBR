const assert = require('assert');
const api = require('../api');

const MOCK_HERO_CREATE = {
    name: 'Iron Man',
    skill: 'Money'
};

const MOCK_HERO_UPDATE = {
    name: 'Captain America',
    skill: 'Shield'
};

let MOCK_ID;

let app;

describe.only('Suite of tests API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    });

    it('List - GET /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    });

    it('List - GET /heroes - should return only 3 items', async () => {
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

    it('List - GET /heroes - should return error by incorrect limit', async () => {
        const LIMIT = 'AEIOU'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT}`
        })
        assert.deepEqual(result.statusCode, 400)
    });

    it('List - GET /heroes - should filter an item', async () => {
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

    it('Create - POST /heroes - should create a hero', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: MOCK_HERO_CREATE
        })
        const { _id, name, skill } = JSON.parse(result.payload)
        MOCK_ID = _id
        assert.ok(result.statusCode === 200)
        assert.deepEqual({ name, skill }, MOCK_HERO_CREATE)
    });

    it('Update - PATCH /heroes/:id - should update a hero by id', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${MOCK_ID}`,
            payload: MOCK_HERO_UPDATE
        })
        const payload = JSON.parse(result.payload)
        assert.ok(result.statusCode === 200)
        assert.ok(payload.message === 'Hero was updated!')
    });
});