import React from 'react';
import Mapcontainer from './map/mapContainer';
import CrimeList from "./crimes/crimeList";
import Tutorial from './tutorial';

export default (props) => {
    const path = props.location.pathname;

    return (

        <div className="outer-div">
            <Mapcontainer/>
            <CrimeList path={path}/>
        </div>
    )
};