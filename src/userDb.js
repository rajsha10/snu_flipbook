const { MongoClient} = require('mongodb');

const url = 'mongodb+srv://manjeet0796:manjeet0796@cluster0.irnuxnb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);
const dbName = "CCU";               //this will be bookFairDb
const collectionName = "doctors";   //this will be users   in future

const displayAll = () => {
    return client.connect()             // to see all data in collection
    .then(() => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        console.log("============FOUND AND CONNECTED=============");

        return collection.find().toArray();
    })
    .then((documents) => {
        console.log(documents);
    })
    .catch((err) =>  {
        console.log(err, "error happened");
    }).finally(() => {
        return client.close();
    })
}

// const user = {name: "raj", age: 33};         //this is details sample

const insertUser = (user) => {
    return client.connect()
    .then(() => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);        // Hardcoded user data
    
        return collection.insertOne(user);
    })
    .then((result)=> {
        console.log('User inserted successfully:', result);
    })
};

module.exports = {
    insertUser
}