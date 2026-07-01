function JobCard({ job, onSelect }) {  
  return (  
    <div className="job-card" onClick={() => onSelect(job.id)}>  
      <h3>{job.title}</h3>  
      <p className="company-name">{job.company} — {job.location}</p>  
      <p>{job.remote ? "Remote" : "On-site"} | {job.experienceRequired}+ yrs experience</p>  
      <div className="skills-list">  
        {job.skillsRequired.map((skill) => (  
          <span className="skill-tag" key={skill}>{skill}</span>  
        ))}  
      </div>  
    </div>  
  );  
}  
  
export default JobCard;