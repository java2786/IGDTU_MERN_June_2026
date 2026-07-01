import { useState } from "react";  
import JobList from "./pages/JobList";  
import JobDetail from "./components/JobDetail";  
import CandidateProfile from "./components/CandidateProfile";  
import "./App.css";  
  
function App() {  
  const [view, setView] = useState("jobs");  
  const [selectedJobId, setSelectedJobId] = useState(null);  
  
  const handleSelectJob = (jobId) => {  
    setSelectedJobId(jobId);  
    setView("detail");  
  };  
  
  return (  
    <div className="app-container">  
      <nav className="navbar">  
        <h1>JobFit AI</h1>  
        <button onClick={() => setView("jobs")}>Jobs</button>  
        <button onClick={() => setView("profile")}>My Profile</button>  
      </nav>  
  
      {view === "jobs" && <JobList onSelectJob={handleSelectJob} />}  
      {view === "detail" && (  
        <JobDetail jobId={selectedJobId} onBack={() => setView("jobs")} />  
      )}  
      {view === "profile" && <CandidateProfile />}  
    </div>  
  );  
}  
  
export default App;  