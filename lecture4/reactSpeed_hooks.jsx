import React, {useState, useRef} from 'react';

const ReactSpeedHooks=()=>{
    const [state, setState] = useState('waiting');
    const [message, setMessage]= useState('클릭하면 시작합니다.');
    const [result, setResult]=useState([]);
    const timer =useRef(null);
    const startTime=useRef();
    const endTime=useRef();

    const onClickScreen=()=>{
        if(state ==='waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timer.current=setTimeout(()=>
            {
                setState('now');
                setMessage('지금 클릭하세요');
                startTime.current=new Date();
            },Math.floor(Math.random()*2000))
            ;
        }
        else if(state==='ready'){
            setMessage('너무 성급하시군요!');
            setState('waiting');
            clearTimeout(timer.current);
        }
        else if(state==='now')
        {
            endTime.current=new Date();
            setState('waiting');
            setMessage('클릭하면 시작합니다');
            setResult((prevState)=>[...prevState,endTime.current-startTime.current]);
            
        }
    }

    const onClickReset=()=>{
        setState('waiting');
        setMessage('클릭하면 시작합니다.');
        setResult([]);
    }

    const renderAverage = ()=>{
        return result.length===0?null :
        <div>평균시간: {result.reduce((a,c)=>a+c)/result.length}ms
        <button onClick={onClickReset}>처음부터 다시시작할래요</button>
        </div>
    }


    return (
        <>
         <div id="screen"
                className={state}
                onClick={onClickScreen}
                >
                    {message}
                </div>
            {renderAverage()}
        </>
    );

}

export default ReactSpeedHooks;

