import React, {useContext, useCallback,memo, useMemo} from 'react';
import {TableContext, CODE, OPEN_CELL,CLICK_MINE,FLAG_CELL,QUESTION_CELL,NORMALIZE_CELL} from './mineFinder';

const getTdStyle=(code)=>{
    switch(code){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background:'#444'
            };
        case CODE.OPENED:
            return{
                background:'#fff'
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background:'yellow'
            }
        case CODE.FLAG:
        case CODE.FLAG_MIN:
            return{
                background:'blue'
            }
        default:
            return{
                background:'#fff'
            }
    }
}

const getTdText=(code)=>{
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑'
        case CODE.FLAG_MIN:
        case CODE.FLAG:
            return '!'
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?'
        default: return code || '';
    }
}

const Td=memo(({rowIndex,cellIndex})=>{
    const {tableData , dispatch, halted} = useContext(TableContext);
    const onClickTd=useCallback(()=>{
        console.log(halted);
        if(halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MIN:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                return dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex});
            case CODE.MINE:
                return dispatch({type:CLICK_MINE, row:rowIndex, cell:cellIndex})
        }
    },[halted]);

    const onRightClick=useCallback((e)=>{
        e.preventDefault();
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                return dispatch({type:FLAG_CELL, row:rowIndex , cell:cellIndex})
            case CODE.FLAG:
            case CODE.FLAG_MIN:
                return dispatch({type:QUESTION_CELL, row:rowIndex , cell:cellIndex})
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return dispatch({type:NORMALIZE_CELL, row:rowIndex , cell:cellIndex})
        }
    },[tableData[rowIndex][cellIndex], halted]);

    return useMemo(()=>(
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClick}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ),[tableData[rowIndex][cellIndex]])
})

export default Td;