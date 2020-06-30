const { getPeople } = require('../service');

Array.prototype.myFilter = function (callback) {
    const list = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        if (!result) continue;
        list.push(item)
    }
    return list;
};

async function main() {
    try {
        const { results } = await getPeople('a')

        // const larsFamily = results.filter(item => item.name.toLowerCase().indexOf('lars') !== -1)
        const larsFamily = results.myFilter(item => item.name.toLowerCase().indexOf('lars') !== -1)
        const names = larsFamily.map(person => person.name)

        console.log('names', names)

    } catch (error) {
        console.error('Error', error)
    }
};

main();