import React from 'react';
export const GridItem = (props : any) => {
    return (
        <div className="grid-item" style={{ gridRow:1, gridColumn:props.columnValue }}></div>
    );
};

