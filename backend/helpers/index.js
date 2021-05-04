const neDBAll = (database) => {
    return new Promise((resolve, reject) => {
        database.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        })
    })
}

const neDBAdd = (database, data) => {
    return new Promise((resolve, reject) => {
        database.insert(data, (err, newDoc) => {
            if (err) reject(err);
            resolve(newDoc)
        })
    })
}

module.exports = {neDBAll, neDBAdd}