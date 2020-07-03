const assert = require('assert');

const api = require('../api');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEsImlhdCI6MTU5MzgxMjgwOX0.ap9Efzj0mWzMI5Z8Uv-UggD5z1SPv30EPAMl-nu4h1Y'
let app;

describe('Auth test suite', function () {
    this.beforeAll(async () => app = await api);

    it('Should get a token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'admin',
                password: 'admin123'
            }
        });
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 200)
        assert.ok(payload.token.length > 10)
    });
});