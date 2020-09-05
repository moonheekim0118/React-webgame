import React, {useState, useRef, useEffect} from 'react';

const rspCoords={
    r:'0',
    s:'-142px',
    p:'-284px'
}

const scores = {
    r:0,
    s:1,
    p:-1
}


const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
    })[0];
  };

const RSP =()=>{
    const [result, setResult]=useState('');
    const [score,setScore]=useState(0);
    const [imgCoord,setImgCoord]=useState(rspCoords.r);
    const interval = useRef();
    useEffect(()=>{  // componentDidMount, componentDidUpdate 역할
        interval.current=setInterval(changHand,1000);
        return()=>{ // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    },[imgCoord]);
    const changHand=()=>{
        if(imgCoord == rspCoords.r){
            setImgCoord(rspCoords.s);
        }
        else if(imgCoord===rspCoords.s)
        {
            setImgCoord(rspCoords.p);
        }
        else if(imgCoord === rspCoords.p){
            setImgCoord(rspCoords.r);
        }
    }

    const onClickBtn=(now)=>()=>{

        clearInterval(interval.current); // 일단 멈춤
        const myScore = scores[now];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff===0){
            setResult('비겼네용')
        }
        else if([-1,2].includes(diff)){
            setResult('이겼네용');
            setScore(prevScore=>prevScore+1);
        }
        else{
            setResult('졌네용');
            setScore(prevState=>prevState-1);
        }
        setTimeout(()=>{
            setResult('');
            interval.current=setInterval(changHand,1000);
        },2000)
    }

    return(
        <>
         <div id="computer" style={{ background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
         <div>
             <button id="rock" className="btn" onClick={onClickBtn('r')}>바위</button>
             <button id="scissor" className="btn" onClick={onClickBtn('s')}>가위</button>
             <button id="paper" className="btn" onClick={onClickBtn('p')}>보</button>
         </div>
    <div>{result}</div>
    <p>현재 {score} 점</p>
        </>
    );
}

export default RSP;