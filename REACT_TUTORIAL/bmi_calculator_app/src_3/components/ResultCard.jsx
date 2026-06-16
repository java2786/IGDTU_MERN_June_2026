function getCategoryClass(category){
    // return category.toLowerCase();
    if(category==="Underweight"){
        return "underweight"
    } else if(category==="Overerweight"){
        return "overweight"
    } else if(category==="Normal"){
        return "normal"
    } else {
        return "obese"
    }
}

function getHealthMessage(category){
    if(category==="Underweight"){
        return "Consider consulting a nutritionist to gradually increase your calories intake."
    } else if(category==="Overerweight"){
        return "Consider light daily exercise and balanced diet to move towards a healthier range."
    } else if(category==="Normal"){
        return "Great work! Maintain your diet and exercise routine."
    } else {
        return "Please consult a doctor for a better health and diet plan."
    }
}

function ResultCard(props){
    let categoryClass = getCategoryClass(props.bmiCategory)
    let categoryMessage = getHealthMessage(props.bmiCategory)
    return (
        <div className="result-card">
            <h2>Your BMI Result</h2>

            <div className="result-name">
                {props.name}
            </div>

            <div className="result-bmi">
                {props.bmiResult}
            </div>

            <div className={"result-category "+categoryClass}>
               {props.bmiCategory}
            </div>

            <div className="result-message">
                {categoryMessage}
            </div>

            
        </div>
    )
}

export default ResultCard;