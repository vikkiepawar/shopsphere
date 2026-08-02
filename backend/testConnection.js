const { MongoClient } = require("mongodb");

const uri =
  "PASTE_YOUR_CONNECTION_STRING_HERE";

const client = new MongoClient(uri);

async function test() {
  try {
    await client.connect();
    console.log("✅ Connected Successfully!");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();
