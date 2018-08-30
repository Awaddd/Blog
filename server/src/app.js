const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')



mongoose.connect("mongodb://localhost:27017/posts", { useNewUrlParser: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", function(callback){
    console.log('Connected to the database.')
});

const Post = require("../models/post");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Routes

app.get('/posts', (req, res) => {
    Post.find({}, 'title content', function (error, posts) {
        if (error) { console.error(error) }
        res.send({
            posts: posts
        })
    }).sort({_id:-1})
})



// Add new post


app.post('/posts', (req, res) => {
    const db = req.db;
    
    var title = req.body.title;
    var content = req.body.content;

    var new_post = new Post({
        title: title,
        content: content
    })

    new_post.save(function (error) {
        if (error){
            console.log(error)
        }

        res.send({
            success: true,
            message: 'Post created!'
        })
    })
})




app.listen(process.envPORT || 3000)