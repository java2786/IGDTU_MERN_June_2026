import jobs from "../data/jobs";  
import JobCard from "../components/JobCard";  
  
function JobList({ onSelectJob }) {  
  return (  
    <div className="job-list">  
      <h2>Open Positions ({jobs.length})</h2>  
      {jobs.map((job) => (  
        <JobCard key={job.id} job={job} onSelect={onSelectJob} />  
      ))}  
    </div>  
  );  
}  
  
export default JobList;  