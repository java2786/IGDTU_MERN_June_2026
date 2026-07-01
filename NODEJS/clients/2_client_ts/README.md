# Advanced React + TypeScript  
  
## 2. Migrating the Project to TypeScript  
  
We are not creating a new project. We are upgrading the existing `client` app.  
  
### Step 1: Install TypeScript  
  
```bash  
cd client  
npm install -D typescript  
```  
  
### Step 2: Create `tsconfig.json`  
  
Create `client/tsconfig.json`  
```bash
touch tsconfig.json
```

Put below in tsconfig.json: 
  
```json  
{  
  "compilerOptions": {  
    "target": "ES2020",  
    "lib": ["ES2020", "DOM", "DOM.Iterable"],  
    "module": "ESNext",  
    "moduleResolution": "bundler",  
    "jsx": "react-jsx",  
    "strict": true,  
    "skipLibCheck": true,  
    "resolveJsonModule": true,  
    "isolatedModules": true,  
    "noEmit": true  
  },  
  "include": ["src"]  
}  
```  
  
### Step 3: Install React type definitions  
  
```bash  
npm install -D @types/react @types/react-dom  
```  
  
### Step 4: Rename your files  
  
Rename every file as follows (keep the content as-is for now — we will add types next):  
  
| Old file | New file |  
|---|---|  
| `src/main.jsx` | `src/main.tsx` |  
| `src/App.jsx` | `src/App.tsx` |  
| `src/data/jobs.js` | `src/data/jobs.ts` |  
| `src/data/candidate.js` | `src/data/candidate.ts` |  
| `src/components/JobCard.jsx` | `src/components/JobCard.tsx` |  
| `src/components/JobDetail.jsx` | `src/components/JobDetail.tsx` |  
| `src/components/CandidateProfile.jsx` | `src/components/CandidateProfile.tsx` |  
| `src/pages/JobList.jsx` | `src/pages/JobList.tsx` |  
  
```bash  
mv src/main.jsx src/main.tsx
mv src/App.jsx src/App.tsx
mv src/data/jobs.js src/data/jobs.ts
mv src/data/candidate.js src/data/candidate.ts
mv src/components/JobCard.jsx src/components/JobCard.tsx
mv src/components/JobDetail.jsx src/components/JobDetail.tsx
mv src/components/CandidateProfile.jsx src/components/CandidateProfile.tsx
mv src/pages/JobList.jsx src/pages/JobList.tsx
```  
### Step 5: Update `index.html`  
  
Open `index.html` in the `client` root and update the script tag:  
  
```html  
<script type="module" src="/src/main.tsx"></script>  
```  
  
### Step 6: Run the dev server  
  
```bash  
npm run dev  
```  
  
The app should still run exactly as before — renaming files alone does not add type safety yet. That happens in the next section.  
  
---  
  
## 3. Defining Shared Types  
  
Create a new file `client/src/types/index.ts`. This becomes the single source of truth for your data shapes — directly reflecting the Module 1 schema.  
  
```bash  
mkdir src/types
touch src/types/index.ts
```

```typescript  
export interface Application {  
  jobId: string;  
  matchScore: number | null;  
  aiFeedback: string | null;  
  status: string;  
}  
  
export interface Job {  
  id: string;  
  title: string;  
  company: string;  
  location: string;  
  remote: boolean;  
  skillsRequired: string[];  
  experienceRequired: number;  
  description: string;  
  createdAt: string;  
}  
  
export interface Candidate {  
  id: string;  
  name: string;  
  email: string;  
  role: "admin" | "candidate";  
  resumeText: string;  
  parsedSkills: string[];  
  applications: Application[];  
}  
```  
  
Notice `matchScore: number | null` and `aiFeedback: string | null`. This is the correct way to type a field that does not have a value yet — TypeScript now knows this field can legitimately be empty, and will force every component using it to handle that case.  
  
---  
  
## 4. Typing the Data Files  
  
Update `client/src/data/jobs.ts`:  
  
```typescript  
import { Job } from "../types";  
  
// const jobs = [  
const jobs: Job[] = [

  {  
    id: "job001",  
    title: "Backend Developer",  
    company: "SwiftKart",  
    location: "Pune",  
    remote: false,  
    skillsRequired: ["Node.js", "Express", "MongoDB"],  
    experienceRequired: 2,  
    description: "Build and maintain REST APIs for our e-commerce platform serving customers across India.",  
    createdAt: "2026-06-01"  
  },  
  // keep your remaining jobs from Module 2 here, unchanged  
];  
  
export default jobs;  
```  
  
Update `client/src/data/candidate.ts`:  
  
```typescript  
import { Candidate } from "../types";  
  
// const candidate = {  
const candidate: Candidate = {
  
  id: "user001",  
  name: "Suresh Kumar",  
  email: "suresh@example.com",  
  role: "candidate",  
  resumeText: "Final year B.Tech student with project experience in Node.js and MongoDB.",  
  parsedSkills: [],  
  applications: [  
    {  
      jobId: "job001",  
      matchScore: null,  
      aiFeedback: null,  
      status: "applied"  
    }  
  ]  
};  
  
export default candidate;  
```  
  
Try this experiment: change `experienceRequired: 2` to `experienceRequired: "two"` in `jobs.ts`. Your editor will immediately underline it in red. That is TypeScript protecting your schema.  
  
---  
  
## 5. Typing the Components  
  
### JobCard.tsx  
  
```typescript  
import { Job } from "../types";  
  
interface JobCardProps {  
  job: Job;  
  onSelect: (jobId: string) => void;  
}  
  
// function JobCard({ job, onSelect }) {  
function JobCard({ job, onSelect }: JobCardProps) { 

    ...


```  
  
### JobList.tsx  
  
```typescript  
import jobs from "../data/jobs";  
import JobCard from "../components/JobCard";  
  
interface JobListProps {  
  onSelectJob: (jobId: string) => void;  
}  
  
// function JobList({ onSelectJob }) {  
function JobList({ onSelectJob }: JobListProps) {  

    ...

```  
  
### JobDetail.tsx  
  
```typescript  
import jobs from "../data/jobs";  
import candidate from "../data/candidate";  
  
interface JobDetailProps {  
  jobId: string;  
  onBack: () => void;  
}  
  
// function JobDetail({ jobId, onBack }) {  
function JobDetail({ jobId, onBack }: JobDetailProps) {  

    ...

```  
  
### CandidateProfile.tsx  
  
```typescript  
import { useState } from "react";  
import candidate from "../data/candidate";  
  
function CandidateProfile() {  
  // const [resumeText, setResumeText] = useState(candidate.resumeText);  
  const [resumeText, setResumeText] = useState<string>(candidate.resumeText);  
  

    ...


```  
  
### App.tsx  
  
```typescript  
import { useState } from "react";  
import JobList from "./pages/JobList";  
import JobDetail from "./components/JobDetail";  
import CandidateProfile from "./components/CandidateProfile";  
import "./App.css";  

// newly added
type View = "jobs" | "detail" | "profile";  
  
function App() {  
  // const [view, setView] = useState("jobs");  
  const [view, setView] = useState<View>("jobs");  
  // const [selectedJobId, setSelectedJobId] = useState(null);  
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);  
   
  // const handleSelectJob = (jobId) => {  
  const handleSelectJob = (jobId: string) => {  
    setSelectedJobId(jobId);  

    ...

```  
  
Notice `type View = "jobs" | "detail" | "profile"` — this is called a union type. It means `view` can only ever be one of these three exact strings. If you accidentally type `setView("job")` anywhere (missing the "s"), TypeScript will catch the typo immediately, instead of you discovering a silently broken screen later.  
  
---  
  
## 6. Confirm Everything Compiles  
  
Run the dev server one more time:  
  
```bash  
npm run dev  
```  
  
The app should look and behave identically to previous. That is expected — TypeScript does not change runtime behavior, it only catches mistakes during development. If you see red underlines anywhere in your editor, read the error message carefully; it is almost always telling you that a value does not match its declared type.  
  