function BmiMeter(){
    return (
        <div className="meter-section">
            <h3>BMI Scale</h3>

            <div className="meter-track">
                <div className="meter-fill" style={{"width": "40%"}}>
                    
                </div>
            </div>
            <div className="meter-marker-row">
                <div className="meter-dot" style={{"left": "40%"}}>
                    
                </div>
            </div>

            <div className="meter-labels">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
            </div>
            
        </div>
    )
}

export default BmiMeter;