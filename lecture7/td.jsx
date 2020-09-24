import React ,{useCallback , memo} from 'react';
import {CLICK_CELL} from './tictactoe';

const td = memo(({rowIndex, cellIndex,dispatch,cellData})=>{
    console.log('renderd');
    const onClickTd= useCallback(()=>{
        if(cellData){
            return;
        }
        dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex});
    },[cellData])

    return(
    <td onClick={onClickTd}>{cellData}</td>
    )
})

export default td;