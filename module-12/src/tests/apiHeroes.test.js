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

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsImlhdCI6MTU5NDA0MTA5OX0.Fa3cziLDW9x9sqndoVnCkAU6nRAgKqdraKadyWgrhG0'
let MOCK_ID;
let app;

const headers = {
    Authorization: TOKEN
};

describe('Suite of tests API Heroes', function () {
    this.timeout(Infinity);
    this.beforeAll(async () => app = await api);

    it('List - GET /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
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
            headers,
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
            headers,
            url: `/heroes?skip=0&limit=${LIMIT}`
        })
        assert.deepEqual(result.statusCode, 400)
    });

    it('Create - POST /heroes - should create a hero', async () => {
        const result = await app.inject({
            method: 'POST',
            headers,
            url: '/heroes',
            payload: MOCK_HERO_CREATE
        })
        const { _id, name, skill } = JSON.parse(result.payload)
        MOCK_ID = _id
        assert.ok(result.statusCode === 200)
        assert.deepEqual({ name, skill }, MOCK_HERO_CREATE)
    });

    it('List - GET /heroes - should filter an item', async () => {
        const LIMIT = 1
        const NAME = MOCK_HERO_CREATE.name
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/heroes?skip=0&limit=${LIMIT}&name=${NAME}`
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(data[0].name, NAME)
    });

    it('Update - PATCH /heroes/:id - should update a hero by id', async () => {
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/heroes/${MOCK_ID}`,
            payload: MOCK_HERO_UPDATE
        })
        const payload = JSON.parse(result.payload)
        assert.ok(result.statusCode === 200)
        assert.ok(payload.message === 'Hero was updated!')
    });

    it('Delete - DELETE /heroes/:id - should delete a hero by id', async () => {
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/heroes/${MOCK_ID}`,
        })
        const payload = JSON.parse(result.payload)
        assert.ok(result.statusCode === 200)
        assert.ok(payload.message === 'Hero was deleted!')
    });
});