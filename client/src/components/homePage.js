import React from 'react';
import {Route} from "react-router-dom";
import CrimeList from "./crimes";

export default (props) => {
    const path = props.location.pathname;
    // console.log(props.location);
    return (
        <div className="outter-div">
            <CrimeList path={path}/>
        </div>
    )
};