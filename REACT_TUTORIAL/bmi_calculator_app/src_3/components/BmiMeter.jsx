function getMeterWidth(bmi){
    let min = 10;
    let max = 40;

    let percentage = ((bmi-min)/(40-min))*100;

    if(percentage<0){
        percentage = 0;
    }
    if(percentage>100){
        percentage = 100;
    }
    return percentage.toFixed(2);
}

function getMeterColor(category){
    if(category==="Underweight"){ return "blue";}
    else if(category==="Overweight"){ return "yellow";}
    else if(category==="Normal"){ return "green";}
    else { return "red";}
}

function BmiMeter(props){
    let widthPercent = getMeterWidth(props.bmiResult);
    let fillColor = getMeterColor(props.bmiCategory);

    return (
        <div className="meter-section">
            <h3>BMI Scale</h3>

            <div className="meter-track">
                <div className="meter-fill" 
                style={{
                    "width": widthPercent+"%",
                    background: fillColor
                }}>
                    
                </div>
            </div>
            <div className="meter-marker-row">
                <div className="meter-dot" 
                style={{"left": widthPercent+"%"}}>
                    
                </div>
            </div>

            <div className="meter-labels">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
            </div>
            
            <div className="meter-bmi-display">
                BMI {props.bmiResult} - {props.bmiCategory}
            </div>
        </div>
    )
}

export default BmiMeter;