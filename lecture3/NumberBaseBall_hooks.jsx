import React, {useState, useRef} from 'react';
import Try from './try_hooks.jsx';
const getNumber= function(){
    const candidate=[1,2,3,4,5,6,7,8,9]
    const numArr=[];
    for(let i = 0; i<4; i++){
       const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
       numArr.push(chosen);
    }
    return numArr;
}

const NumberBaseBallHooks=()=>{
    const [answer,setAnswer] =useState(getNumber());
    const [value,setValue]=useState('');
    const [result,setResult]=useState('');
    const [tries, setTries]=useState([]);

    const onSubmitForm=(e)=>{
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런');
            setTries((prevState)=>{
                return [...prevState,{try:value,result:'홈런'}]
            });
        }
        else{
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >=9){
                setResult(`10번넘게 틀렸습니다...답은${answer.join(',')}입니다.`);
                alert('게임다시시작합니다.');
                setResult('');
                setValue('');
                setAnswer(getNumber());
                setTries([]);
            }
            else{
                for(let i =0; i<4; i++){
                    if(answerArray[i]===answer[i]){
                        strike++;
                    }
                    else if(answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                setTries((prevState)=>(
                    [...prevState,{try:value,result:`${strike}스트라이크${ball}볼!`}]))
            }
        }
    }

    const onInputChange=(e)=>{
        setValue(e.target.value);
    }

    return (
        <>
         <h1>{result}</h1>
                <form onSubmit={onSubmitForm}>
                    <input maxLength={4} value={value} onChange={onInputChange}></input>
                    <button type="submit">입력!</button>
                </form>
                <div>Tries : {tries.length}</div>
                <ul>
                    {tries.map((v,i)=>{
                        return <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
                    })}
                </ul>
        </>
    );
}

export default NumberBaseBallHooks;