import React from 'react';
import CrimeList from "./crimes/crimeList";

export default (props) => {
    const path = props.location.pathname;

    return (
        <div className="outer-div">
            <CrimeList path={path}/>
        </div>
    )
};