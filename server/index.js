const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


//Middleware
app.use(bodyParser.json())
app.use(cors())

const posts = require('./routes/api/posts')

app.use('/api/posts', posts)

//handle Production
if(process.env.NODE_ENV === 'production'){
    //static folder
    app.use(express.static(__dirname + '/public/'))

    //handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname, '/puclic/index.html') )
}


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server strated on port ${port}`) )