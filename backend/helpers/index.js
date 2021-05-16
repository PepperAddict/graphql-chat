const Datastore = require("nedb");
const database = new Datastore("database.db");
database.loadDatabase();

const neDBAll = () => {
    return new Promise((resolve, reject) => {
        database.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        })
    }).catch((err) => console.log(err))
}

const neDBCount = () => {
    return new Promise((resolve, reject) => {
        database.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs.length);
        })
    }).catch((err) => console.log(err))
}

const neDBAdd = async ( data) => {
    const count = await neDBCount(database)
    
    return new Promise((resolve, reject) => {
        database.insert({...data, _id: count + 1}, (err, newDoc) => {
            if (err) reject(err);
            resolve(newDoc)
        })
    }).catch((err) => console.log(err))
}

const subscribers = [];
const newSubscriber = (fn) => subscribers.push(fn)

module.exports = {neDBAll, neDBAdd, newSubscriber, subscribers}
