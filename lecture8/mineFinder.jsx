import React , {useReducer , createContext , useMemo , useEffect} from 'react';
import Table from './table';
import Form from './Form';

export const CODE ={
    MINE:-7,
    NORMAL:-1,
    QUESTION:-2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MIN:-5,
    CLICKED_MINE:-6,
    OPENED:0
}
export const TableContext = createContext({
    tableData:[],
    halted:true,
    dispatch:()=>{}, // 초기값이라서 모양만 맞춰주기
});

const initalState={
    tableData:
    [
    ],
    timer:0,
    result:'',
    halted:true,
    opened:0,
    data:{
        row:0,
        cell:0,
        mine:0
    }
}

const plantMine=(row,cell,mine)=>{
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle = [];
    while(candidate.length > row*cell -mine){
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i = 0; i < row; i++){
        const rowData=[];
        data.push(rowData);
        for(let j = 0 ;j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }


    for(let k =0; k< shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k]%cell;
        data[ver][hor]=CODE.MINE;
    }
    console.log(data);
    return data;
}

export const START_GAME='START_GAME';
export const OPEN_CELL='OPEN_CELL';
export const CLICK_MINE='CLICK_MINE';
export const FLAG_CELL='FLAG_CELL';
export const QUESTION_CELL='QUESTION_CELL';
export const NORMALIZE_CELL='NORMALIZE_CELL';
export const INCREMENT_TIMER='INCREMENT_TIMER';

const reducer=(state,action)=>{
    switch(action.type){
        case START_GAME:
            return{
                ...state,
                data:{
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                opened:0,
                timer:0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted:false
            }
        case OPEN_CELL:
            let tableData=[...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            let arround =[];
            if (tableData[action.row-1]){
                arround=arround.concat(
                     tableData[action.row-1][action.cell-1],
                     tableData[action.row-1][action.cell],
                     tableData[action.row-1][action.cell+1]
                 );
            }
            arround=arround.concat(
                tableData[action.row][action.cell-1],
                tableData[action.row][action.cell+1]
            )
            if(tableData[action.row+1]){
                arround=arround.concat(
                    tableData[action.row+1][action.cell-1],
                    tableData[action.row+1][action.cell],
                    tableData[action.row+1][action.cell+1]
                );
            }
            const count = arround.filter((v)=>[CODE.MINE, CODE.FLAG_MIN, CODE.QUESTION_MINE].includes(v)).length;
            tableData[action.row][action.cell]=count;
            let halted=false;
            let result='';
            let openedCount = ++state.opened;
            if(+state.data.row * +state.data.cell - +state.data.mine === openedCount){
                // 이김!
                halted=true;
                result='이겼습니다'
            }
            return{
                ...state,
                tableData,
                halted:halted,
                result:result,
                opened:openedCount
            }
        case CLICK_MINE:
            tableData=[...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell]=CODE.CLICKED_MINE;
            return{
                ...state,
                halted:true,
                tableData,
            }
        case FLAG_CELL:
            tableData=[...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell]=tableData[action.row][action.cell]===CODE.MINE? CODE.FLAG_MIN : CODE.FLAG
            return{
                ...state,
                tableData
            }
        case QUESTION_CELL:
            tableData=[...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell]=tableData[action.row][action.cell]===CODE.FLAG_MIN? CODE.QUESTION_MINE : CODE.QUESTION
            return{
                ...state,
                tableData
            }
        case NORMALIZE_CELL:
            tableData=[...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell]=tableData[action.row][action.cell]===CODE.QUESTION_MINE? CODE.MINE : CODE.NORMAL
            return{
                ...state,
                tableData
            }
        case INCREMENT_TIMER:
            return{
                ...state,
                timer:state.timer+1
            }
        default:
            return state;

    }
}

const mineFinder=()=>{

    const [state,dispatch]=useReducer(reducer,initalState);
    const {tableData, timer, result, halted,opened}= state;
    const value = useMemo(()=>({tableData,dispatch, halted}),[tableData, halted]);
    useEffect(() => {
        let timer;
        if(halted===false){
            timer = setInterval(()=>{
            dispatch({type:INCREMENT_TIMER})
        },1000);
    }
        return () => {
            clearInterval(timer);
        }
    }, [halted])
    return(
        <TableContext.Provider value={value}>
            <Form/>
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>
    )
}

export default mineFinder;

