const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Job = require("../models/Job");
const seed_jobs_data = require("./seed_jobs_data")
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected!')

const seed_data = seed_jobs_data;
const seedJobs = [  
  {  
    title: "Backend Developer",  
    company: "SwiftKart",  
    location: "Pune",  
    remote: false,  
    skillsRequired: ["Node.js", "Express", "MongoDB"],  
    experienceRequired: 2,  
    description: "Build and maintain REST APIs for our e-commerce platform."  
  },  
  {  
    title: "Frontend Developer",  
    company: "Flipkart",  
    location: "Bengaluru",  
    remote: true,  
    skillsRequired: ["React", "JavaScript", "CSS"],  
    experienceRequired: 1,  
    description: "Work on customer-facing pages used by millions of shoppers."  
  },  
  {  
    title: "Data Analyst",  
    company: "LIC",  
    location: "Chennai",  
    remote: false,  
    skillsRequired: ["SQL", "Power BI", "Excel"],  
    experienceRequired: 0,  
    description: "Analyze policy and claims data to support regional decisions."  
  }  
]; 

        await Job.deleteMany();
        await Job.insertMany(seed_jobs_data);
        console.log("Database seeded with sample job");

        process.exit(1);
        
    })
    .catch(function (e) {
        console.log("mongodb connection error")
        console.log(e)

        process.exit(1);
    })
