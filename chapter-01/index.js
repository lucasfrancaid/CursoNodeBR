const util = require('util');
const getAddressAsync = util.promisify(getAddress)

function getUser() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            //return reject(new Error('User not found!'))
            return resolve({
                id: 1,
                name: 'Lucas',
                birthday: new Date(),
            })
        }, 1000);
    })
};

function getPhone(userId) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                phone: '923233029',
                ddd: '12'
            })
        }, 2000);
    });
};

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'Av Node',
            number: 100
        })
    }, 2000)
};

main()
async function main() {
    try {
        console.time('promise-time')
        const user = await getUser()
        // const phone = await getPhone(user.id)
        // const address = await getAddressAsync(user.id)
        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ])
        const phone = result[0]
        const address = result[1]
        console.timeEnd('promise-time')
        
        console.log(`
            Name: ${user.name}
            Phone: (${phone.ddd}) ${phone.phone}
            Address: ${address.street}, ${address.number}
        `);
    } catch (err) {
        console.error('Error', err)
    };
};


// const userPromise = getUser()

// userPromise
//     .then((user) => {
//         return getPhone(user.id)
//             .then((phone) => {
//                 return {
//                     user: {
//                         id: user.id,
//                         name: user.name
//                     },
//                     phone: phone,
//                 }
//             })
//     })
//     .then((res) => {
//         const address = getAddressAsync(res.user.id)
//         return address.then((address) => {
//             return {
//                 user: res.user,
//                 phone: res.phone,
//                 address: address
//             }
//         })
//     })
//     .then((res) => {
//         console.log(`
//             Name: ${res.user.name}
//             Address: ${res.address.street}, ${res.address.number}
//             Phone: (${res.phone.ddd}) ${res.phone.phone}
//         `)
//     })
//     .catch((err) => {
//         console.error('Error', err)
//     })

//getUser(function resolveUser(error, user) {
//     if (error) {
//         console.log('User not found!')
//         return;
//     };

//     getPhone(user.id, function resolvePhone(error1, phone) {
//         if (error1) {
//             console.log('User phone not found!')
//             return;
//         };

//         getAddress(user.id, function resolveAddress(error2, address) {
//             if (error2) {
//                 console.log('User address not found!')
//                 return;
//             };

//             console.log(`
//                 User: ${user.name},
//                 Address: ${address.street}, ${address.number},
//                 Phone: (${phone.ddd}) ${phone.phone}
//             `);
//         });
//     });
// });
