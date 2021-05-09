const neDBAll = (database) => {
    return new Promise((resolve, reject) => {
        database.find({}, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        })
    }).catch((err) => console.log(err))
}

const neDBAdd = (database, data) => {
    return new Promise((resolve, reject) => {
        database.insert(data, (err, newDoc) => {
            if (err) reject(err);
            resolve(newDoc)
        })
    }).catch((err) => console.log(err))
}

module.exports = {neDBAll, neDBAdd}
