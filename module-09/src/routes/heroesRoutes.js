const BaseRoute = require('./base/baseRoute');

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
                try {
                    const { skip, limit, name } = request.query
                    let query = {}
                    
                    if (name) query.name = name
                    if (isNaN(skip)) throw Error('Type of skip is incorrect')
                    if (isNaN(limit)) throw Error('Type of limit is incorrect')

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.error('Error', error)
                    return 'Intern server error!'
                }
            }
        };
    };
};

module.exports = HeroesRoutes;