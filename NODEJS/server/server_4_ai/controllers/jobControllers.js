// let getAllJobs = (req, res)=>{
//     const jobs = Job.find();
//     res.json(jobs);
// }
const Job = require("../models/Job");  
  
const getAllJobs = async (req, res) => {  
  try {  
    const jobs = await Job.find();  
    res.json(jobs);  
  } catch (error) {  
    res.status(500).json({ error: "Server error: Cannot find jobs" });  
  }  
};  
  
const getJobById = async (req, res) => {  
  try {  
    const job = await Job.findById(req.params.id);  
    if (!job) {  
      return res.status(404).json({ error: "Job not found" });  
    }  
    res.json(job);  
  } catch (error) {  
    res.status(500).json({ error: "Server error: can not find by id: #"+req.params.id });  
  }  
};  
  
const createJob = async (req, res) => {  
  try {  
    let user_input = req.body;
  
    if (!user_input.title || !user_input.company) {  
      return res.status(400).json({ error: "Title and company are required" });  
    }  
  
    const newJob = await Job.create(user_input);  
    res.status(201).json(newJob);  

  } catch (error) {  
    res.status(500).json({ error: "Server error: can not create job" });  
  }  
};  

module.exports = {
    getAllJobs, getJobById, createJob
}