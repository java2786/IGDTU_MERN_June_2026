import { useState } from "react";
import Button from "./components/Button";

function App(){
    let count = 10;
    let handleClick = function(e){
        count = count + 1
        console.log("After click: "+count)
    }
    
    const [age, setAge] = useState(15);
    let handleAgeClick = function(e){
        setAge(age + 1)
    }
    
    return (
        <div>
            <h2>Your counter value is <mark>{count}</mark></h2>
            <Button clickEvent={handleClick} color="gray" content="Counter"></Button>
            <hr/>
            <h2>Your age value is <mark>{age}</mark></h2>
            <Button clickEvent={handleAgeClick} color="darkseagreen" content="Age"></Button>

            <h1>{"Your age is "+age}</h1>
        </div>
    );
}

export default App;