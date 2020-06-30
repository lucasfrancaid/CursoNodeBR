const { getPeople } = require('../service');

Array.prototype.myReduce = function (callback, initialValue = 0) {
    let finalValue = typeof initialValue !== undefined ? initialValue : this[0]
    for (let index = 0; index <= this.length -1; index++) {
        finalValue = callback(finalValue, this[index], this)
    }
    return finalValue;
};

async function main() {
    try {
        const { results } = await getPeople('a')

        const heights = results.map(item => parseInt(item.height))
        console.log('heights', heights)

        // const total = heights.reduce((previous, current) => previous + current)
        const total = heights.myReduce((previous, current) => previous + current)
        console.log('total', total)

        const myList = [
            ['Lucas', 'França'],
            ['FullStack', 'Developer']
        ]

        const concatLists = myList.myReduce((previous, current) => previous.concat(current), []).join(', ')
        console.log(concatLists)

    } catch (error) {
        console.error('Error', error)
    }
};

main();