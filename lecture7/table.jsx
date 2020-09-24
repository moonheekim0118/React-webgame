import React from 'react';
import Tr from './tr';
const table = ({tableData,dispatch})=>{

    return ( 
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr,i)=>(<Tr rowIndex={i} rowData={tableData[i]} dispatch={dispatch}/>))}
            </tbody>
        </table>
    )

}

export default table;