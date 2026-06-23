const mongoose = require("mongoose");  
  
const candidateSchema = new mongoose.Schema({  
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },  
  password: { type: String, required: true },  
  role: { type: String, enum: ["admin", "candidate"], default: "candidate" },  
  resumeText: { type: String, default: "" },  
  parsedSkills: { type: [String], default: [] },  
  applications: [  
    {  
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },  
      matchScore: { type: Number, default: null },  
      aiFeedback: { type: String, default: null },  
      status: { type: String, default: "applied" }  
    }  
  ]  
});  
  
candidateSchema.set("toJSON", {  
  transform: (doc, ret) => {  
    ret.id = ret._id.toString();  
    delete ret._id;  
    delete ret.password;  
    delete ret.__v;  
  }  
});  
  
module.exports = mongoose.model("Candidate", candidateSchema);  