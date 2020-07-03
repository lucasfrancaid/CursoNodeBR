const Sequelize = require('sequelize');

const driver = new Sequelize(
    'heroes',
    'lucasfranca',
    'lucasfranca',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false
    }
);

async function main() {
    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        skill: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'TB_HEROES',
        freezeTableName: false,
        timestamps: false
    });

    await Heroes.sync()
    await Heroes.create({
        name: 'Green Lantern',
        skill: 'Ring'
    })

    const result = await Heroes.findAll({ raw: true })
    console.log('result', result)
};

main();