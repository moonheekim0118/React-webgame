import React ,{useState , useRef, useEffect , useMemo, useCallback} from 'react';
import Ball from './Ball';


function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }

const Lotto =()=>{
    const LottoNumbers = useMemo(()=>getWinNumbers(),[]);
    // hooks는 렌더 해줄 때 전체 함수를 다시 실행하므로 getWinNumbers가 계속 실행되었음
    // 따라서, useMemo를 이용하여 특정 함수를 한번만 실행하여, 결괏값을 저장해놓아야 한다.
    const [winNumbers, setWinNumbers] = useState(LottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus]=useState(null);
    const [redo, setRedo]=useState(false);
    const timeouts = useRef([]);

    useEffect(()=>{
        console.log('use Effect');
        for(let i =0 ; i < winNumbers.length-1; i++){
            timeouts.current[i]=setTimeout(()=>{
                setWinBalls((prevBalls)=>[...prevBalls,winNumbers[i]]);
            },(i+1)*1000);
        }
        timeouts.current[6]=setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        },7000);
        return()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            })   
        };
    },[timeouts.current]);
    // 배열 요소 없을경우 -> componentDidMount만
    // 배열 요소 있을 경우 -> didMount랑 didUpdate 둘다
    // return 해주면 willUnmount 해준다.

    const onClickRedo= useCallback(()=>{
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current=[];
    },[winNumbers])

    return (
        <>
          <div>당첨 숫자</div>
          <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
          </div>
          <div>보너스!</div>
          {bonus && <Ball number={bonus} />}
          {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
      );
}

export default Lotto;