import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Map from './map.js';

class GeneralMap extends Component {

    render(){
        return(
            <div>
                <Map/>
            </div>
        )
    }
}

export default withRouter(GeneralMap);
