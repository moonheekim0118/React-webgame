const React = require('react');
const {Component}= React;
class WordRelay extends Component{
    constructor(props){
        super(props);
        this.state= {
            word:'리어카',
            value:'',
            result:''
        };
    }

    onChange=(e)=>{
        this.setState({value:e.target.value});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.value.charAt(0)===this.state.word.charAt(this.state.word.length-1)){
            this.setState({result:'휴 넘겼다^^;',word:this.state.value, value:''});
        }else{
            this.setState({result:'벌칙~!zzz', value:''});
        }
        this.input.focus();
    }
    input;
    onRefInput=(c)=>this.input=c;

    render(){
        return(
            <>
            <div>쿵쿵따리 쿵쿵따 쿵쓰쿵쓰쿵쓰쿵쓰~ {this.state.word}!!!</div>
            <form onSubmit={this.onSubmit}>
                <input ref={this.onRefInput}type="text" value={this.state.value} onChange={this.onChange}></input>
                <button type="submit">쿵쿵따!</button>
            </form>
            <div>{this.state.result}</div>
            </>
        );
    }
}

module.exports=WordRelay;