import jobs from "../data/jobs";  
import candidate from "../data/candidate";  
  
function JobDetail({ jobId, onBack }) {  
  const job = jobs.find((j) => j.id === jobId);  
  const application = candidate.applications.find((a) => a.jobId === jobId);  
  
  if (!job) return <p>Job not found.</p>;  
  
  return (  
    <div className="job-detail">  
      <button onClick={onBack}>Back to Job List</button>  
      <h2>{job.title}</h2>  
      <p className="company-name">{job.company} — {job.location}</p>  
      <p>{job.description}</p>  
      <h4>Skills Required</h4>  
      <ul>  
        {job.skillsRequired.map((skill) => <li key={skill}>{skill}</li>)}  
      </ul>  
      <h4>Your Match Score</h4>  
      <p>{application?.matchScore ?? "Not yet evaluated"}</p>  
    </div>  
  );  
}  
  
export default JobDetail;  