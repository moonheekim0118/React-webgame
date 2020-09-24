import React,{useMemo} from 'react';
import Td from './td';

const tr = ({rowData , rowIndex, dispatch})=>{
    return(
        <tr>
            {Array(rowData.length).fill().map((td,i)=>(
            useMemo(() => <Td rowIndex={rowIndex} cellData ={rowData[i]} cellIndex={i} dispatch={dispatch}>{' '}</Td>, [rowData[i]])
            ))}
        </tr>
    )
    // useMemo로 컴포넌트 자체를 감싸주어도 된다.
    // 혹은 훅스 전체에 memo를 적용해도 된다.
}
// 
export default tr;