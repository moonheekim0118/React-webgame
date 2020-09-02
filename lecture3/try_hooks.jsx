import React from 'react';

const Try=({tyrInfo})=>{
    return(
        <li >
            <div>{tyrInfo.try}</div>
            <div>{tyrInfo.result}</div>
        </li>
    );
}

export default Try;