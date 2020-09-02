import React, {Component} from 'react';

class Try extends Component{
    render(){
        return(
            <li >
                <div>{this.props.value.try}</div>
                <div>{this.props.value.result}</div>
            </li>
        );
    }
}

export default Try;