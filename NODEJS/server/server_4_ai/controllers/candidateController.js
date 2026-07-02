const Candidate = require("../models/Candidate")
const Job = require("./../models/Job")
const {getMatchScore, parseResumeSkills} = require("./../services/aiService");

exports.applyToJob = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        if (!jobId) {
            return res.status(404).json({ error: "JobId is missing" })
        }

        const candidateId = req.user.id;

        const candidate = await Candidate.findById(candidateId);


        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found with id #" + candidateId })
        }

        const appliedApps = candidate.applications.filter((app) => app.jobId.toString() === jobId)
        console.log(appliedApps)
        if (appliedApps.length > 0) {
            return res.status(400).json({ error: "Already applied to this job." });
        }

        const currentJob = {
            jobId: jobId,
            matchScore: null,
            aiFeedback: null,
            status: "applied"
        }
        candidate.applications.push(currentJob);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        return res.status(500).json({ error: "Server error", err })
    }

}


// candidateId = req.user.id;
exports.getMyProfile = async (req, res) => {
    try {
        const candidateId = req.user.id;

        const candidate = await Candidate.findById(candidateId);
        return res.json(candidate)
    } catch (err) {
        return res.status(500).json({ error: "Server error", err })
    }
}



exports.evaluateMatch = async (req, res) => {
    try {

        const candidate = await Candidate.findById(req.user.id);
        const job = await Job.findById(req.body.jobId);

        if(!candidate || !job){
            return res.status(404).json({error: "Candidate or Job not found"});
        }

        const application = candidate.applications.find((app)=>app.jobId.toString()==req.body.jobId);

        if(!application){
            return res.status(400).json({error: "Apply to this job before requesting match score."});
        }

        const parsedSkills = await parseResumeSkills(candidate.resumeText);
        candidate.parsedSkills = parsedSkills

        const {matchScore,aiFeedback} = await getMatchScore(parsedSkills, job.skillsRequired, job.experienceRequired)

        application.matchScore = matchScore;
        application.aiFeedback = aiFeedback;
        application.status = "evaluated";

        await candidate.save();

        res.json({success: true, parsedSkills, matchScore, aiFeedback})
    } catch (err) {
        return res.status(500).json({ error: "AI evaluation failed. Please try again.", err })
    }
}

exports.updateResume = async (req, res) => {
    try {
        
        // req -> res
        // candiate -> update
        // const resumeText = req.body.resumeText;
        // const candidate = await Candidate.findByIdAndUpdate(
        //     req.user.id,
        //     {resumeText: resumeText},
        //     {new: true}
        // );
        // res.json(candidate);
        res.json({"success": true})
    } catch (err) {
        return res.status(500).json({ error: "Resume update failed.", err })
    }
}
