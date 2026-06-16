// import { useState } from "react";

function InputForm(props) {
    // props.setHeight("demo")
    // props.userHeight = "123";


    return (
        <div className="form-card">
            <h2>Enter Your Details</h2>

            <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={props.name}
                    onChange={function (event) {
                        props.setName(event.target.value)
                    }}
                    placeholder="e.g. Ramesh" />
            </div>

            <div className="form-group">
                <label htmlFor="height">Your Height (cm)</label>
                <input type="text"
                    onChange={function (event) {
                        props.setHeight(event.target.value)
                    }}
                    value={props.height} id="height" placeholder="e.g. 171" />
            </div>

            <div className="form-group">
                <label htmlFor="weight">Your Weight (kg)</label>
                <input type="text"
                    onChange={function (event) {
                        props.setWeight(event.target.value)
                    }}

                    value={props.weight} id="weight" placeholder="e.g. 65" />
            </div>

            <button className="calculate-btn" onClick={function (e) {
                console.log(props.name)
                console.log(props.height)
                console.log(props.weight)
                
            }}>
                Calculate BMI
            </button>
        </div>
    );
}

export default InputForm;
