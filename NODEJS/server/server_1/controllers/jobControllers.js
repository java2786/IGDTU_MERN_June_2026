const Job = require("./../models/Job")

let getAllJobs = (req, res)=>{
    const jobs = Job.find();
    res.json(jobs);
}

// http://localhost:3000/api/jobs/1
let getJobById = (req, res)=>{  
    let reqId = req.params.id

    const job = Job.findById(reqId)

    if(!job){
        return res.status(404).json({error: "Job not found"})
    }

    res.status(200).json(job);
}

// http://localhost:3000/api/jobs
let createJob = (req, res)=>{  

    let user_input = req.body

    const newJob = Job.create({
        title: user_input.title,  
        company: user_input.company,  
        location: user_input.location,  
        remote: user_input.remote ?? false,  
        skillsRequired: user_input.skillsRequired ?? [],  
        experienceRequired: user_input.experienceRequired ?? 0,  
        description: user_input.description ?? ""
    })

    if(!newJob){
        return res.status(404).json({error: "Job not created"})
    }

    res.status(201).json(newJob);
}

module.exports = {
    getAllJobs, getJobById, createJob
}