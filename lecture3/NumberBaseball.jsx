import React, {Component} from 'react';
import Try from './try.jsx';
function getNumbers(){ // 숫자 네개를 랜덤하게 뽑는 함수 
    const candidate=[1,2,3,4,5,6,7,8,9]
    const numArr=[];
    for(let i = 0; i<4; i++){
       const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
       numArr.push(chosen);
    }
    return numArr;
}

class NumberBaseball extends Component{
    constructor(props){
        super(props);
        this.state = {
            result:'',
            value:'',
            answer:getNumbers(),
            tries:[],
        };
        this.onSubmitForm=this.onSubmitForm.bind(this);
        this.onInputChange=this.onInputChange.bind(this);
    }
    onSubmitForm(e){
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState((prevState)=>{
                return {result:'홈런',tries:[prevState.tries, {try: prevState.value, result:'홈런'}],value:''}
            });
        }
        else{
            const answerArray = this.state.value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball =0 ;
            if(this.state.tries.length >= 9 ){
                this.setState((prevState)=>{
                    return {result:`10번넘게 틀렸습니다...답은${prevState.answer.join(',')}입니다.`}
                })
                alert('게임을 다시 시작합니다');
                this.setState({
                    result:'',
                    value:'',
                    answer:getNumbers(),
                    tries:[],
                });
              
            } else{
                for(let i =0; i < 4; i++){
                    if(answerArray[i] === this.state.answer[i]){
                        strike++;
                    } else if( this.state.answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                this.setState((prevState)=> {return{
                    tries:[...prevState.tries, {try: prevState.value, result:`${strike}스트라이크 ${ball}볼 입니다.`}] ,value:''
                }})
            }
        }
        
    }

    onInputChange(e){
        this.setState({value:e.currentTarget.value});
    }
    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onInputChange}></input>
                    <button type="submit">입력!</button>
                </form>
                <div>Tries : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((val,i)=>{
                        return <Try key={val+i} value={val}/>
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;