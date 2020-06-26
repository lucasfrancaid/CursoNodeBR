function getUser(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            name: 'Lucas',
            birthday: new Date(),
        })
    }, 1000);
};

function getPhone(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: '923233029',
            ddd: '12'
        })
    }, 2000);
};

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'Av Node',
            number: 100
        })
    }, 2000)
};

function solveUser(error, user) {
    console.log('user', user)
}

getUser(function solveUser(error, user) {
    if (error) {
        console.log('User not found!')
        return;
    };

    getPhone(user.id, function solvePhone(error1, phone) {
        if (error1) {
            console.log('User phone not found!')
            return;
        };

        getAddress(user.id, function solveAddress(error2, address) {
            if (error2) {
                console.log('User address not found!')
                return;
            };

            console.log(`
                User: ${user.name},
                Address: ${address.street}, ${address.number},
                Phone: (${phone.ddd}) ${phone.phone}
            `);
        });
    });
});

const user = getUser(solveUser)
//const phone = getPhone(user.id)
//const address = getAddress(user.id)
//
//console.log(user, phone, address)