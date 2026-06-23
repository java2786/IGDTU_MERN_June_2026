const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {  
    title: {type: String, required: true},  
    company: {type: String, required: true},  
    location: String,  
    remote: {type: Boolean, default: false},  
    skillsRequired: {type: [String], default: []},  
    experienceRequired: {type: Number, default: 0},  
    description: String,  
    createdAt: {type: Date, default: Date.now}  
  });


jobSchema.set('toJSON', {
  transform: (doc, ret)=>{
    ret.id = ret._id.toString()
    delete ret._id;
    delete ret.__v;
  }
})


const Job = {
    find: function(){return jobs;},
    findById: function(id){
        // forEach
        // filter
        // for

        return jobs.find(function(job){
            if(job.id == "job00"+id){
                return true;
            }
        })
    },
    create: (data)=>{
        const newJob = {
            id: "job00"+nextId,
            ...data,
            createdAt: new Date().toISOString().substring(0,10)
        }
        nextId++;
        jobs.push(newJob);
        return newJob;
    }
}

module.exports = mongoose.model('Job', jobSchema)
 