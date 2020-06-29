const axios = require('axios');

const URL = 'https://swapi.dev/api/people';

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data;
};

getPeople('r2')
    .then((res) => {
        console.log('res', res)
    })
    .catch((err) => console.log('Error', err)
    );

module.exports = {
    getPeople
}