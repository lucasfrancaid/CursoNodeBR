const BaseRoute = require('./base/ baseRoute');

class HeroesRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    };

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        };
    };
};

module.exports = HeroesRoutes;