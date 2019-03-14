import React from 'react';
import CrimeList from "./crimes";
import Mapcontainer from './map/mapContainer';

export default (props) => {
    const path = props.location.pathname;

    return (

        <div className="outer-div">
            <Mapcontainer/>
            <CrimeList path={path}/>
        </div>
    )
};