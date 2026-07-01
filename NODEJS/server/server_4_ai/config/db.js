const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'))
//   .catch(function(e){
//     console.log("mongodb connection error")
//   })

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection created...")
    } catch(err){
        console.log(err)
        process.exit(1)
    }  

    console.log("Last line of db.js")
}

module.exports = connectDB