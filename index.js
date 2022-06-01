const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.1aeky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const recipeCollection = client.db('recipes').collection('recipe');

        app.get('/recipes', async (req, res) => {
            const query = {};
            const cursor = recipeCollection.find(query);
            const recipes = await cursor.toArray();
            res.send(recipes);
        })

        app.get('/recipe/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const recipe = await recipeCollection.findOne(query);
            res.send(recipe);
          })



    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running server!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
