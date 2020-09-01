const React= require('react');
const {Component}= React;
class Gugudan extends Component{
    constructor(props){
        super(props);
        this.state={
            num1:Math.ceil(Math.random()*9),
            num2:Math.ceil(Math.random()*9),
            value:'',
            result:'',
        };
    }
    onSubmit=(e)=>{
                    e.preventDefault();
                    parseInt(this.state.value) === this.state.num1*this.state.num2 ? 
                    this.setState((prevState)=>({result:`${prevState.num1}*${prevState.num2}=${prevState.value} 딩동댕쓰~~`,
                    num1: Math.ceil(Math.random()*9),
                    num2: Math.ceil(Math.random()*9),
                    value:''
                    })) 
                    : this.setState({result:"땡쓰!!!",
                    num1: Math.ceil(Math.random()*9),
                    num2: Math.ceil(Math.random()*9),
                    value:''
                    })
                    this.input.focus();
    }

    onChange=(e)=>{
        this.setState({value: e.target.value})
    }
    input;

    onRefInput=(c)=>this.input=c;

    render(){
        return (
            <React.Fragment>
            <div>{this.state.num1}*{this.state.num2}는 뭘까용~~</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.onRefInput}type="number" value={this.state.value} onChange={this.onChange}/>
                    <button type="submit">입력</button>
                </form>
            <div>{this.state.result}</div>
            </React.Fragment>
        );
    }
}

module.exports=Gugudan;