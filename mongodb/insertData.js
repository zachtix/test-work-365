require('dotenv').config();
const { CONNECTION_STR, DATABASE_NAME } = process.env;

const fs = require('fs');
const csv = require('csv-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = CONNECTION_STR;

let dataArray = [];

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

fs.createReadStream('./exampleFile/37176ff3-dd70-4f1f-8e1d-83eda3cf77e4.csv')
  .pipe(csv())
  .on('data', (data) => dataArray.push(data))
  .on('end', () => {
    insertData();
  });

async function insertData() {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);

    for (const e of dataArray) {
      await db.collection('location').insertOne(e);
      console.log("data inserted!");
    }
  } finally {
    await client.close();
  }
}
