const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.MONGO_URL;

const client = new MongoClient(connectionString);

let db;

async function connectDataBase() {

    await client.connect();
    db = client.db('expensive-tracker-db');
    console.log("Mongo DB Connected Successfully");
    
}

function getDataBase(){
    return db;
}


module.exports = {
        connectDataBase , getDataBase
}