const OpenAI = require('openai');
require("dotenv").config();


const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});
const model = process.env['OPENAI_CHEAP_MODEL'];

exports.parseResumeSkills = async (resumeText)=>{

    try{
        const completion = await openai.chat.completions.create({
        model,
        response_format: {type: "json_object"},
        temperature: 0.2,
        messages: [
            { role: 'system', content: `You are a resume assistant with 20 years of experience. Extract a list of technicall skills mentioned in candidate's resume text. Response only with valid JSON in the exact format: {'skills': ['skill1', 'skill2', 'skill3']}` },
            { role: 'user', content: resumeText },
            ],
        });

        const result = JSON.parse(completion.choices[0].message.content);
        // {'skills': ['skill1', 'skill2', 'skill3']}
        console.log(result)
        console.log(result.skills)
        return result.skills || [];
    } catch(err){
        console.error("Parse Resume Skills failed: ",err.message);
        return [];
    }

}



exports.getMatchScore = async (parsedSkills, skillsRequired, experienceRequired)=>{

    try{
        const completion = await openai.chat.completions.create({
        model,
        response_format: {type: "json_object"},
        temperature: 0.2,
        messages: [
            { role: 'system', content: `You are a Hiring manager with 20 years of experience. Compare a candidate's skills against required job skills and give a match score out of 100, along with a short honest sentence feedback. Response only with valid JSON in the exact format: {'matchScore': number, 'aiFeedback': 'string'}` },
            { role: 'user', content: `Candiate skills are ${parsedSkills.join(',')}. Job required skills is ${skillsRequired.join(',')}. Job required experience is ${experienceRequired} years.` },
            ],
        });

        const result = JSON.parse(completion.choices[0].message.content);
        // {'matchScore': number, 'aiFeedback': 'string'}
        console.log(result)
        return {
            'matchScore': result.matchScore ?? 0, 
            'aiFeedback': result.aiFeedback || "Evaluation Failed."
        };
    } catch(err){
        console.error("Get Match Score failed: ",err.message);
        return {
            'matchScore': 0, 
            'aiFeedback': "Evaluation Failed."
        };
    }

}


