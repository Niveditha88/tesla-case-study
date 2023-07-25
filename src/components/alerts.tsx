import React from 'react';
export const Alerts = (props : any) => {
    return (
        <>
            <div className="alert alert-success">
                <strong>Success!</strong> {props.children}.
            </div>
        </>
    );
};
