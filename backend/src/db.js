import {MongoClient} from "mongodb"
import "dotenv/config";

process.env.PORT || 8000;

let db;

async function connectToDb(cb){
    const client = new MongoClient(`mongodb+srv://${process.env.MONGONAME}:${process.env.MONGOPASSWORD}@cluster0.pwovrgr.mongodb.net/`)
    await client.connect();
    db = client.db("recipe-app-db");

    cb();
}

export {connectToDb, db};