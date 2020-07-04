const Mongoose = require('mongoose');

Mongoose
    .connect(
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

const connection = Mongoose.connection
connection.once('open', () => console.log('Running database!'))

// setTimeout(() => {
    // const state = connection.readyState
    // console.log('state', state)
// }, 1000)

const heroeSchema = new Mongoose.Schema({
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

const model = Mongoose.model('heroes', heroeSchema)

async function main() {
    const resultCreate = await model.create({
        name: 'Batman',
        skill: 'Money'
    })

    console.log('result', resultCreate)
};

main();