import React from 'react';
export const GridItem = (props : any) => {
    console.log("columnValue"+props.columnValue);
    console.log("rowValue"+props.rowValue);
    return (
        <>
            <div className="grid-item" style={{ gridRow:1, gridColumn:props.columnValue }}></div>
        </>
    );
};

