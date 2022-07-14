const { MongoClient } = require('mongodb');
require("dotenv").config({ path: `.env`, })

const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD

const uri = `mongodb://${DB_NAME}:${DB_PASSWORD}@mongo48.mydevil.net:27017/${DB_NAME}`;
const client = new MongoClient(uri);

client.connect();
const db = client.db(DB_NAME);
module.exports = { db };