const { get } = require('axios');

const URL = 'https://swapi.dev/api/people';

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`
    const response = await get(url)
    return response.data.results.map(mapPeople);
};

function mapPeople(item) {
    return {
        name: item.name,
        height: item.height
    }
};

module.exports = { getPeople };