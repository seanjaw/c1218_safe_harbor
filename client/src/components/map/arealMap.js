import React, {Component} from 'react';
import axios from 'axios';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZXBhZGlsbGExODg2IiwiYSI6ImNqc2t6dzdrMTFvdzIzeW41NDE1MTA5cW8ifQ.wmQbGUhoixLzuiulKHZEaQ';

class AreaMap extends Component{

    componentDidMount(){
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    }

    render(){
        return(
            <div>
                <div id='map'/>
               
            </div>
        )
    }
}
export default AreaMap;