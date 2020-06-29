const service = require('../service');

Array.prototype.myMap = function (callback) {
    const newArrayMapped = []
    for (let index = 0; index <= this.length - 1; index++) {
        const result = callback(this[index], index)
        newArrayMapped.push(result)
    }

    return newArrayMapped;
};

async function main() {
    try {
        const result = await service.getPeople('a')
        
        // const names = []
        // result.results.forEach((item) => {
        //     names.push(item.name)
        // })

        // const names = result.results.map(person => person.name)

        const names = result.results.myMap((person, index) => `[${index}] ${person.name}`)

        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
};

main()