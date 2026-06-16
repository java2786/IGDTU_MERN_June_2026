function Button(props){
    return (
        <button onClick={props.clickEvent} style={{backgroundColor: props.color}}>
            {props.content}
        </button>
    );
}

export default Button;