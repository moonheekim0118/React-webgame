const React = require('react');
const {useState, useRef} = React;
const WordRelay = ()=>{
    const [word, setWord] = useState('슭발곰');
    const [value,setValue]=useState('');
    const [result,setResult]=useState('');
    const inputRef= useRef();

    const onChange=(e)=>{
        setValue(e.target.value);
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        if(value.charAt(0)===word.charAt(word.length-1)){
            setResult('딩동댕');
            setWord(value)
            setValue('');
        }
        else{
            setResult('땡!!');
            setValue('');
        }
        inputRef.current.focus();
    }

    return(
        <>
        <div>쿵쿵따리 쿵쿵따 쿵쓰쿵쓰쿵쓰쿵쓰~ {word}!!!</div>
        <form onSubmit={onSubmit}>
            <input ref={inputRef}type="text" value={value} onChange={onChange}></input>
            <button type="submit">쿵쿵따!</button>
        </form>
        <div>{result}</div>
        </>
    );
}

module.exports=WordRelay;