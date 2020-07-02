// Connection MongoDB with Docker
/*
    $ sudo docker exec -it mongodb_nodebr \
        mongo -u lucasfranca -p lucasfranca --authenticationDatabase heroes
*/

/*------- The next commands are run in the interactive terminal of MongoDB -------*/

// Showing databases
/*
    > show dbs
*/

// Changing context to database heroes
/*
    > use heroes
*/

// Showing collections (tables)
/*
    > show collections 
*/

// Finding documents
db.heroes.find()

// Finding with better format
db.heroes.find().pretty()

// MongoDB allows run javascript
for (let i = 0; i <= 10; i++) {
    db.heroes.insert({
        name: `Clone-${i}`,
        skill: 'Speed',
        birthday: '1996-03-10'
    })
};

// Count documents in database
db.heroes.count()

// Return the first document found
db.heroes.findOne()

// Return a limit of 5 document and sort by desc name
db.heroes.find().limit(5).sort({ name: -1 })

/*-------MongoDB Methods-------*/

// create
db.heroes.insert({
    name: 'Flash',
    skill: 'Speed',
    birthday: '1996-03-10'
})

// read
db.heroes.find()

// update
db.heroes.update(
    { _id: ObjectId("5efdf028459421617399d408") },
    { $set: { name: 'Batman' } }
)

// delete
db.heroes.remove({}) // remove all
db.heroes.remove({ name: 'Clone-10' }) // remove with where
