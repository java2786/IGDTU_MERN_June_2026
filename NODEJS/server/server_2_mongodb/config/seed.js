const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Job = require("../models/Job");

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected!')

        const jobArray = [
            {
                "title": "Title 1",
                "company": "Company 1",
                "location": "Location 1",
                "remote": true,
                "skillsRequired": ["python", "javascript", "dart", "java"],
                "experienceRequired": 0,
                "description": "this is demo description"
            }
        ]

        await Job.deleteMany();
        await Job.insertMany(jobArray);
        console.log("Database seeded with sample job");

        process.exit(1);
        
    })
    .catch(function (e) {
        console.log("mongodb connection error")
        console.log(e)

        process.exit(1);
    })
