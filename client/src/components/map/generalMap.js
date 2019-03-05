import React, { Component } from 'react';
import axios from 'axios';
import districtData from './DistrictsCoordinates/district';
import './generalMap.scss';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZXBhZGlsbGExODg2IiwiYSI6ImNqc2t6dzdrMTFvdzIzeW41NDE1MTA5cW8ifQ.wmQbGUhoixLzuiulKHZEaQ';


class GeneralMap extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [-118.4004, 34.0736],
            zoom: 9
        });
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        this.overlay = document.getElementById('map-overlay');
        this.hoveredDistrictId = null;
        this.map.on('style.load', () => {
            this.map.addSource("districts", {
                "type": "geojson",
                "data": districtData

            });

            this.map.addLayer({
                "id": "district-fills",
                "type": "fill",
                "source": "districts",
                "paint": {
                    "fill-color": "#000000",
                    "fill-color": ['interpolate',
                        ['linear'], ['get', 'count'],
                        0, '#FFFFFF',
                        100, '#FF8888',
                        1000, '#FF0000',
                        5000, '#6D0000',
                        10000, '#3B0000',
                        50000, '#4B0202',
                        100000, '#A25626',
                        500000, '#8B4225',
                        1000000, '#723122'],
                    "fill-opacity": ["case",
                        ["boolean", ["feature-state", "hover"], false],
                        1,
                        .8

                    ]
                }

            });

            this.map.on("mousemove", "district-fills", (e) =>{

                // // Change the cursor style as a UI indicator.
                this.map.getCanvas().style.cursor = 'pointer';
                this.description = e.features[0].properties.APREC;
                this.numberCrimes = e.features[0].properties.count;
                this.overlay.innerHTML = '';
                this.title = document.createElement('strong');
                this.title.textContent = this.description;

                this.count = document.createElement('div');
                this.count.textContent = 'Total count: ' + this.numberCrimes.toLocaleString();

                this.overlay.appendChild(this.title);
                this.overlay.appendChild(this.count);
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
                console.log(e.features[0].properties)
                this.feature = e.features[0];
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

    }

    render() {
        return (
            <div>
                <div id='map' />
                <div id='map-overlay' class='map-overlay'></div>
            </div>
        )
    }
}
export default GeneralMap;