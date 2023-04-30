const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI=process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
const mongoconn=async()=>{
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

module.exports  = mongoconn;
