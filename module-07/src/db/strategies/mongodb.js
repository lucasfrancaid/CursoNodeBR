const Mongoose = require('mongoose');

const ICrud = require('./interfaces/interfaceCrud');

const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
};

class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    };

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state !== 'Connecting') return state;
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    };

    defineModel() {
        const schema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            skill: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: new Date()
            }
        });
        
        this._heroes = Mongoose.model('heroes', schema)
    };

    connect() {
        Mongoose.connect(
            'mongodb://lucasfranca:lucasfranca@localhost:27017/heroes',
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error) => {
                if (!error) return;
                console.log('Connection failed!', error)
            },
        );

        this._driver = Mongoose.connection
        this._driver.once('open', () => console.log('Running database!'))
    };

    async create(item) {
        const resultCreate = await model.create({
            name: 'Batman',
            skill: 'Money'
        })
        console.log('result', resultCreate)
    };
};

module.exports = MongoDB;