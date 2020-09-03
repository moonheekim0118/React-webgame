import React, { Component} from 'react';

class ReactSpeed extends Component{
    state={
        state:'waiting', // 배경색 
        message:'클릭해서 시작하세요!',
        result :[]
    };
    timeout;
    startTime;
    endTime;

    onClickReset=()=>{
        this.setState({state:'ready', message:'초록색이 되면 클릭하세요', result:[]});
    }

    onClickScreen=()=>{
        const {state, message, result} = this.state;
        if(state === 'waiting'){
            this.setState({state: 'ready', message:'초록색이 되면 클릭하세요'});
            this.timeout=setTimeout(()=>{
                this.setState({state:'now', message:'지금클릭하세요'});
                this.startTime=new Date();
            }, Math.floor(Math.random()*1000)+2000);
        }
        else if(state==='ready'){ // 성급하게 클릭 
            this.setState({state: 'waiting', message:'너무 성급하시군요! 초록색이 된 후에 클릭하세요'});
            clearTimeout(this.timeout); // web api에서 돌고있는 타임아웃 삭제하고 다시하도록!
        }
        else if(state==='now'){ // 반응속도 체크 
            this.endTime=new Date();
            this.setState((prevState)=>{
                this.setState({state:'waiting', message:'클릭해서 시작하세요!', result:[...prevState.result,this.endTime-this.startTime]})
            })
        }

    }

    renderAverage=()=>{
        const {result}= this.state;
        return result.length===0?null :
        <div>평균시간: {result.reduce((a,c)=>a+c)/result.length}ms
        <button onClick={this.onClickReset}>처음부터 다시시작할래요</button>
        </div>
    }
    render(){
        const {state, message}= this.state;
        return(
            <>
                <div id="screen"
                className={state}
                onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ReactSpeed;