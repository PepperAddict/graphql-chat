const Datastore = require("nedb");
const database = new Datastore("database.db");
database.loadDatabase();

//This is for retrieving all data stored in database.db
const neDBAll = () => {
    return new Promise((resolve, reject) => {
        database.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        })
    }).catch((err) => console.log(err))
}


//This is for getting the currect number of indexes stored in database.db
const neDBCount = () => {
    return new Promise((resolve, reject) => {
        database.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs.length);
        })
    }).catch((err) => console.log(err))
}

//This is for adding data into database.db
const neDBAdd = async ( data) => {
    const count = await neDBCount(database)
    
    return new Promise((resolve, reject) => {
        database.insert({...data, _id: count + 1}, (err, newDoc) => {
            if (err) reject(err);
            resolve(newDoc)
        })
    }).catch((err) => console.log(err))
}

//This is for deleting a data in database.db
const neDBRemove = async (id) => {
    return new Promise((resolve, reject) => {
        const idINT = parseInt(id)

        database.remove({_id: idINT}, (err, numRemoved) => {
            if (err) reject(err);
            console.log(numRemoved)
            resolve(numRemoved)
        })
    }).catch((err) => console.log(err))
}

//this is for subscriptions.
const subscribers = [];
// whenever newSubscriber gets initialized, they're added to subscribers. See postMessage in graphql
// to see it being used. 
const newSubscriber = (fn) => subscribers.push(fn)

module.exports = {neDBAll, neDBAdd, newSubscriber, neDBRemove, subscribers}
