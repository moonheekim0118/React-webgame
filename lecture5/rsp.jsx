// component로 짜기~
import React, { Component} from 'react';

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

class RSP extends Component{
    state={
        result:'',
        imgCoord:0,
        score:0
    };

    changeHand=()=>{
        const {imgCoord} = this.state;
        if(imgCoord == rspCoords.r){
            this.setState({imgCoord:rspCoords.s});
        }
        else if(imgCoord===rspCoords.s)
        {
            this.setState({imgCoord:rspCoords.p});
        }
        else if(imgCoord === rspCoords.p){
            this.setState({imgCoord:rspCoords.r});
        }
    }
    interval;
    componentDidMount(){ //처음 렌더가 승인된 후에 실행되는 것! setState를 렌더 될 때 써야할 때 ! -> 비동기 요청을 많이 함! 
        this.interval=setInterval(this.changeHand,1000);
    }

    componentWillUnmount(){ // 컴포넌트가 제거되기 직전에 실행되는 것! -- > didMount에서 했던 작업 제거하는 역할 -> 비동기 요청 정리! 
        clearInterval(this.interval);
    }

    onClickBtn=(now)=>()=>{
        const { result, score, imgCoord} = this.state
        clearInterval(this.interval); // 일단 멈춤
        const myScore = scores[now];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff===0){
            this.setState({result:'비겼네용'});
        }
        else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return {result:'이겼네용',score : prevState.score+1}});
        }
        else{
            this.setState((prevState)=>{
                return {result:'졌네용',score : prevState.score-1}});
        }
        setTimeout(()=>{
            this.setState({result:''});
            this.interval=setInterval(this.changeHand,1000);
        },2000)
        
    }
    render(){
        const { result, score, imgCoord} = this.state
        return(
            <>
             <div id="computer" style={{ background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
             <div>
                 <button id="rock" className="btn" onClick={this.onClickBtn('r')}>바위</button>
                 <button id="scissor" className="btn" onClick={this.onClickBtn('s')}>가위</button>
                 <button id="paper" className="btn" onClick={this.onClickBtn('p')}>보</button>
             </div>
        <div>{result}</div>
        <p>현재 {score} 점</p>
            </>
        );
    }
}

export default RSP;