const Commander = require('commander');
const database = require('./database');

const Hero = require('./hero');

async function main() {
    Commander
        .version('v1')
        .option('-n, --name [value]', 'Hero name')
        .option('-s, --skill [value]', 'Hero skill')
        .option('-i, --id [value]', 'Hero id')

        .option('-c, --create', 'Create a hero')
        .option('-l, --list', 'List of heroes')
        .option('-r, --remove [value]', 'Remove a hero by id')
        .option('-u, --update [value]', 'Update a hero by id')
        .parse(process.argv)

    const hero = new Hero(Commander)

    try {
        if (Commander.create) {
            delete hero.id
            const result = await database.create(hero)
            if (!result) {
                console.error('Hero could not created!')
                return;
            };
            console.log('Hero was created!')
        };

        if (Commander.list) {
            const result = await database.list()
            console.log(result)
            return;
        };

        if (Commander.remove) {
            const result = await database.remove(hero.id)
            if (!result) {
                console.error('Hero could not removed!')
                return;
            };
            console.log('Hero was deleted!')
        };

        if (Commander.update) {
            const updateId =  parseInt(Commander.update)
            const data = JSON.stringify(hero)
            const updateHero = JSON.parse(data)

            const result = await database.update(updateId, updateHero)
            if (!result) {
                console.error('Hero could not updated!')
                return;
            };

            console.log('Hero was updated!')
        };

    } catch (error) {
        console.error('Error', error);
    };
};

main();