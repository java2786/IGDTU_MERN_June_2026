const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const jobRoutes = require('./routes/jobRoutes')

dotenv.config() // read and load .env
console.log(process.env.pwd)
const PORT = process.env.PORT

console.log(typeof express)

let app = express()
app.use(cors())

app.use(express.json())

// http://localhost:3000/api/jobs

app.use("/api/jobs", jobRoutes)

app.listen(PORT, function(){
    console.log(`http://localhost:${PORT}/`)
})
