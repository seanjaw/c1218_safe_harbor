import React, {Component} from 'react';
import CrimeAPI from '../crimes/crimeAPI';
import MapContainer from "../map/mapContainer";

class CrimeId extends Component {
    render(){
        return(
            <div>
                <MapContainer/>
                <CrimeAPI/>
            </div>
        )
    }
}


export default CrimeId;
