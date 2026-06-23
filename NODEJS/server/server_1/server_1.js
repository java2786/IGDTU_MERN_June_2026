const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')

dotenv.config() // read and load .env
console.log(process.env.pwd)
const PORT = process.env.PORT

console.log(typeof express)

let server = express()
server.use(cors())
server.use(express.json())
// http://localhost:3000/api/jobs

server.get("/", function(req, res){
    // res.send("Awesome")
    res.json({message: "This is my very first node endpoint"})
})

server.listen(PORT, function(){
    console.log(`http://localhost:${PORT}/`)
})

// pubjabi -> shuru
// bangali -> ...
// hinid -> prarambh
// english -> start