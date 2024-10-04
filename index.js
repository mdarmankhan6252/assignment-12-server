const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ewhtdrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {

   const newsCollection = client.db('newsDB').collection('news')

   app.get('/news', async(req, res) =>{
      const result = await newsCollection.find().toArray()
      res.send(result)
   })

   app.post('/news', async(req, res) =>{
    const news = req.body
    const result = await newsCollection.insertOne(news)
    res.send(result)
   })

  //  app.delete('/news/:id', async(req, res) =>{
  //   const id = req.params.id;
  //   const query = {_id : new ObjectId(id)}
  //  })



    
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    

  }
}
run().catch(console.dir);





app.get('/', (req, res) =>{
   res.send('My server is running...')
})

app.listen(port, () =>{
   console.log('my server is running on port :', port);
})