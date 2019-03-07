import React, { Component } from 'react';
import axios from 'axios';
import districtData from './DistrictsCoordinates/district';
import { withRouter } from 'react-router-dom';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
mapboxgl.accessToken = 'pk.eyJ1IjoiZXBhZGlsbGExODg2IiwiYSI6ImNqc2t6dzdrMTFvdzIzeW41NDE1MTA5cW8ifQ.wmQbGUhoixLzuiulKHZEaQ';


class GeneralMap extends Component {
    state = {
        total: [],
        areaID:null
    }
  
    async componentDidMount() {
        
        const totalCrimesPerDistrict = await axios.get('/api/precInfo');
        // console.log(totalCrimesPerDistrict);
        this.setState({
            total: totalCrimesPerDistrict.data
        })
        let p = districtData.features;
        // let q = districtData.features[0].properties
        let q = totalCrimesPerDistrict.data.data;

        // console.log(districtData.features)
        // console.log(districtData.features[0].properties)
        // console.log(q);
        // console.log(q[0].total);
        // console.log(districtData.features[0].properties.PREC)
        for (const objectNumber in p) {

            for (const precNumber in q) {
                if (q[precNumber].PREC === p[objectNumber].properties.PREC) {
                    p[objectNumber].properties.total = q[precNumber].total
                }
            }

        }
        // console.log(p[1].properties)


        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [-118.4004, 34.0736],
            zoom: 8.4
        });
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        
        this.geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
            });

        this.map.addControl(new mapboxgl.NavigationControl());

        this.overlay = document.getElementById('map-overlay');
        document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
        this.hoveredDistrictId = null;
        this.map.on('style.load', () => {
            this.map.addSource("districts", {
                "type": "geojson",
                "data": districtData
                // "data": "https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/LAPD_Division/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson"


            });

            this.map.addLayer({
                "id": "district-fills",
                "type": "fill",
                "source": "districts",
                "paint": {
                    "fill-color": ['interpolate',
                        ['linear'], ['get', 'total'],
                        6000, '#FF2A00',
                        6500, '#FF0C00',
                        7000, '#BB0000',
                        8000, '#9F0000',
                        9000, '#7A0000',
                        10000, '#5F0000',
                        11000, '#440000',
                        12000, '#200000'],
                    "fill-opacity": ["case",
                        ["boolean", ["feature-state", "hover"], false],
                        1,
                        .8

                    ]
                  
                }

            });

            this.map.addLayer({
                "id": "district-borders",
                "type": "line",
                "source": "districts",
                "layout": {},
                "paint": {
                "line-color": "#000000",
                "line-width": 1
                }
            });

            this.map.on("mousemove", "district-fills", (e) => {

                // // Change the cursor style as a UI indicator.
                this.map.getCanvas().style.cursor = 'pointer';
                this.description = e.features[0].properties.APREC;
                // this.areaID = e.features[0].properties.PREC;
                this.numberCrimes = e.features[0].properties.total;
                this.overlay.innerHTML = '';
                this.title = document.createElement('strong');
                this.title.textContent = this.description;
                // console.log(e.features[0].properties.PREC)
                this.total = document.createElement('div');
                this.total.textContent = 'Total total: ' + this.numberCrimes.toLocaleString();

                this.overlay.appendChild(this.title);
                this.overlay.appendChild(this.total);
                this.overlay.style.display = 'block';
                // // Ensure that if the map is zoomed out such that multiple
                // // copies of the feature are visible, the popup appears
                // // over the copy being pointed to.
                // // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                // //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                // // }

                // // Populate the popup and set its coordinates
                // // based on the feature found.

                this.popup.setLngLat(e.lngLat)
                    .setHTML(this.description)
                    .addTo(this.map);
                // console.log(e.features[0].properties)
                // this.feature = e.features[0];
                if (e.features.length > 0) {

                    if (this.hoveredDistrictId) {
                        this.map.setFeatureState({ source: 'districts', id: this.hoveredDistrictId }, { hover: false });
                    }
                    this.hoveredDistrictId = e.features[0].id;

                    this.map.setFeatureState({ source: 'districts', id: this.hoveredDistrictId }, { hover: true });

                }

            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            this.map.on("mouseleave", "district-fills", () => {
                this.map.getCanvas().style.cursor = '';
                if (this.hoveredDistrictId) {
                    this.map.setFeatureState({ source: 'districts', id: this.hoveredDistrictId }, { hover: false });
                }
                // overlay.style.display = 'none';
                this.hoveredDistrictId = null;
                this.popup.remove();
            });

            
        });

        this.map.on("click", "district-fills", (e) => {
            this.areaID = e.features[0].properties.PREC;
            // this.setState({areaID:this.areaID})
            // console.log(this.areaID)
             this.props.history.push('/area/' +this.areaID);
           console.log(this.props)
            
        });

    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div id='map' />
                <div id='map-overlay' className='map-overlay'></div>
                {/* <nav id='filter-group' className='filter-group'></nav> */}
                <div id='geocoder' className='geocoder'></div>
            </div>
        )
    }
}
export default withRouter(GeneralMap);