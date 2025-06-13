const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@${process.env.MONGODB_CLUSTER_URI}/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function printContactformResponse() {
  try {
    const db = client.db('initdb')
    const contactFormResponse = db.collection('contactformResponse')
    const cursor = contactFormResponse.find()
    await cursor.forEach((row) => {})
  } finally {
    await client.close()
  }
}
export async function insertContactformResponse(doc) {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    const database = client.db('initdb')
    const movies = database.collection('contactformResponse')
    // create a document to be inserted
    const result = await movies.insertOne(doc)
  } finally {
    await client.close()
  }
}
