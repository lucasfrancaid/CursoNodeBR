const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const PASS = 'Lucas@123123'
const HASH = '$2b$04$fhrsqTftrS43JtLcHWO1Duwpe/tUhXzBiUwO4bfwJ6aZtAmiQwNZC'

describe('Suite of tests Password Helper', function () {
    it('Should generate a hash from password', async () => {
        const result = await PasswordHelper.hashPassword(PASS)
        assert.ok(result.length > 10)
    });

    it('Should validate password comparing with hash', async () => {
        const result = await PasswordHelper.comparePassword(PASS, HASH)
        assert.ok(result)
    });
});