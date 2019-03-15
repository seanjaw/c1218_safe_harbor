import React, {Component} from 'react';
import AreaAPI from './areaAPI';
import MapContainer from "../map/mapContainer";

class AreaId extends Component {
    render(){
        return(
            <div>
                <MapContainer/>
                <AreaAPI/>
            </div>
        )
    }
}


export default AreaId;
