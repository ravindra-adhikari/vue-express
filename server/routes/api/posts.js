const express = require('express')
const mongodb = require('mongodb')
const url = 'mongodb+srv://ravi:testing@123@mlab-xlbst.mongodb.net/test?retryWrites=true&w=majority'

const router = express.Router()

//Get Post
router.get('/',async(req, res) =>{
        const posts = await loadPostCollecion()
        res.send(await posts.find({}).toArray())
})

//Add Post
router.post('/', async(req, res) => {
    const posts = await loadPostCollecion()
    await posts.insertOne({
        text : req.body.text,
        createdAt : new Date()
    })
    res.status(201).send()
})


//Delet Post
router.delete("/:id",async(req, res) => {
    const posts = await loadPostCollecion()
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

//Update Post


async function loadPostCollecion(){
    const client = await mongodb.MongoClient.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true })
        return client.db('vue-express').collection('posts')
    
}

module.exports = router