import { useState } from "react";  
import candidate from "../data/candidate";  
  
function CandidateProfile() {  
  // const [resumeText, setResumeText] = useState(candidate.resumeText);  
  const [resumeText, setResumeText] = useState<string>(candidate.resumeText);  
  
  return (  
    <div className="candidate-profile">  
      <h2>{candidate.name}</h2>  
      <p>{candidate.email}</p>  
      <h4>Resume</h4>  
      <textarea  
        value={resumeText}  
        onChange={(e) => setResumeText(e.target.value)}  
        rows={6}  
      />  
      <p className="note">This text will be analyzed by AI in Module 8 to extract your skills automatically.</p>  
    </div>  
  );  
}  
  
export default CandidateProfile;  