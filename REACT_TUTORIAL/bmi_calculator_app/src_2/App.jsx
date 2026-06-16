import InputForm from "./components/InputForm"
import ResultCard from "./components/ResultCard"
import BmiMeter from "./components/BmiMeter"
import "./index.css"
import { useState } from "react";

function App(){
    // const [varName, setVarName] = useState(initialValue);
    const [name, setName] = useState("") 
    const [height, setHeight] = useState("") 
    const [weight, setWeight] = useState("") 

    return (
        <div className="container">
            <h1>My BMI Calculator</h1>
            <p>Body Mass Index Health Checker</p>

            <InputForm 
                // user_name={name} user_set_name={setName}
                // user_height={height}  user_set_height={setHeight}
                // user_weight={weight}/> user_set_weight={setWeight}

                name={name} setName={setName}
                height={height} setHeight={setHeight}
                weight={weight} setWeight={setWeight}
                />

            <ResultCard/>
            <BmiMeter/>
        </div>
    );
}

export default App;