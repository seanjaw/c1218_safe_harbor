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
        areaID: null,
        center: [-118.4004, 34.0736]
    }

    async componentDidMount() {
        console.log('mounted', this.fab)
        M.FloatingActionButton.init(this.fab, {
            direction: 'left',
            hoverEnabled: false
          });
        const totalCrimesPerDistrict = await axios.get('/api/precInfo');
        this.setState({
            total: totalCrimesPerDistrict.data
        })
        let featuresArray = districtData.features;
        let dataArray = totalCrimesPerDistrict.data.data;

        for (const objectNumber in featuresArray) {
            for (const precNumber in dataArray) {
                if (dataArray[precNumber].PREC === featuresArray[objectNumber].properties.PREC) {
                    featuresArray[objectNumber].properties.total = dataArray[precNumber].total
                }
            }
        }
        const bounds = [
            [-122.568165, 27.008172], // Southwest coordinates
            [-114.150626, 38.458773]  // Northeast coordinates
        ];

        this.map = new mapboxgl.Map({
            container: 'map',

            style: 'mapbox://styles/seanjaw/cjt661w9n599g1fr3oilywj23',

            center: [-118.4004, 34.0736],
            zoom: 8.7,
            maxZoom: 18,
            maxBounds: bounds
        });
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        this.geocodePopup = new mapboxgl.Popup({
            closeOnClick: false
        });

        this.geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            // further limit results to the geographic bounds representing the region of
            // Los Angeles
            // bbox: [139.965, -38.030, 155.258, -27.839],
            bbox: [-122.568165, 27.008172, -114.150626, 38.458773],
            proximity: [-118.4004, 34.0736]
        });

        this.map.addControl(new mapboxgl.FullscreenControl());
        this.map.addControl(new mapboxgl.NavigationControl());


        this.overlay = document.getElementById('map-overlay');
        document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
        this.hoveredDistrictId = null;

        this.map.on('style.load', () => {
            this.map.addSource("districts", {
                "type": "geojson",
                "data": districtData
            })

            this.map.addLayer({
                "id": "district-fills",
                "type": "fill",
                "source": "districts",
                "paint": {
                    "fill-color": ['interpolate',
                        ['linear'], ['get', 'total'],
                        6000, '#FFCA6E',
                        7000, '#FF7F50',
                        8000, '#FF0000',
                        9000, '#CB0000',
                        10000, '#5F0000',
                        11000, '#440000',
                        12000, '#200000'],
                    "fill-opacity": ["case",
                        ["boolean", ["feature-state", "hover"], false],
                        1,
                        .85
                    ]
                }
            });
            //create district borders 
            this.map.addLayer({
                "id": "district-borders",
                "type": "line",
                "source": "districts",
                "layout": {},
                "paint": {
                    "line-color": "#000000",
                    "line-width": 0.8
                }
            });

            //labels names of each district
            this.map.addLayer({
                "id": "district-names",
                "source": "districts",
                "type": "symbol",
                "layout": {
                    "text-field": ['get', 'APREC'],
                    "text-optional": true,
                    "icon-text-fit": "both",
                    "text-size": 12

                },
                "paint": {
                    "text-color": "#ffffff",
                }
            })

            // After the map style has loaded on the page, add a source layer and default
            // styling for a single point.
            this.map.on('load', () => {
                this.map.addSource('single-point', {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": []
                    }
                });

                this.map.addLayer({
                    "id": "point",
                    "source": "single-point",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "#007cbf"
                    }
                });

                // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
                // makes a selection and add a symbol that matches the result.
                this.geocoder.on('result', (ev) => {
                    this.map.on("zoom", () => {
                        console.log(this.map.getZoom())
                        if (this.map.getZoom() > 12) {
                            this.map.setLayoutProperty('district-fills', 'visibility', 'none')
                            this.map.setLayoutProperty('district-borders', 'visibility', 'none')
                        }
                        else {
                            this.map.setLayoutProperty('district-fills', 'visibility', 'visible')
                            this.map.setLayoutProperty('district-borders', 'visibility', 'visible')
                        }
                    })

                    this.map.getSource('single-point').setData(ev.result.geometry);
                    console.log(ev.result);


                    this.geocodePopup.setLngLat(ev.result.geometry.coordinates)
                        .setHTML(ev.result.place_name)
                        .addTo(this.map)

                });
            });
            this.map.on("mousemove", "district-fills", (e) => {
                // // Change the cursor style as a UI indicator.
                this.map.getCanvas().style.cursor = 'pointer';
                this.description = e.features[0].properties.APREC;
                this.numberCrimes = e.features[0].properties.total;
                this.overlay.innerHTML = '';
                this.title = document.createElement('strong');
                this.title.textContent = this.description;
                this.total = document.createElement('div');
                this.total.textContent = 'Total crimes: ' + this.numberCrimes.toLocaleString();
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
                this.overlay.style.display = 'none';
                this.hoveredDistrictId = null;
                this.popup.remove();
            });


        });

        this.map.on("click", "district-fills", (e) => {
            this.areaID = e.features[0].properties.PREC;
            this.props.history.push('/area/' + this.areaID);
        });


        this.map.on("zoom", () => {
            console.log(this.map.getZoom())
            if (this.map.getZoom() > 12) {
                this.map.setLayoutProperty('district-fills', 'visibility', 'none')
                this.map.setLayoutProperty('district-borders', 'visibility', 'none')
            }
            else {
                this.map.setLayoutProperty('district-fills', 'visibility', 'visible')
                this.map.setLayoutProperty('district-borders', 'visibility', 'visible')
            }
        })
        this.generalAreaMenu();


    }
    generalAreaMenu = () => {
        let mapDiv = document.getElementById('map');
        let menuDiv = document.createElement('div');

        let search = document.createElement('i');
        search.id = 'search';
        search.classList.add('material-icons');
        search.setAttribute('title', 'Search');
        mapDiv.appendChild(menuDiv);
        menuDiv.appendChild(search);
        document.getElementById('search').innerHTML = 'search';
        document.getElementById('search').addEventListener('click', this.geocodeDisplay)

        let flyToLink = document.createElement('i');
        menuDiv.id = 'menu';
        flyToLink.id = 'flyTo';
        flyToLink.classList.add('material-icons');
        flyToLink.setAttribute('title', 'Center camera');
        mapDiv.appendChild(menuDiv);
        menuDiv.appendChild(flyToLink);
        document.getElementById('flyTo').innerHTML = 'location_searching';
        document.getElementById('flyTo').addEventListener('click', this.flyToHome);


    }

    flyToHome = () => {
        this.geocodePopup.remove();
        this.map.flyTo({
            center: this.state.center,
            zoom: 8.7
        })

    }


    geocodeDisplay = () => {
        let geocoder = document.getElementById('geocoder');
        geocoder.classList.toggle('hide-geocoder');
    }
    legendDisplay = () => {
        let legendArray = [
            [6000, '#FFCA6E'],
            [7000, '#FF7F50'],
            [8000, '#FF0000'],
            [9000, '#CB0000'],
            [10000, '#5F0000'],
            [11000, '#440000'],
            [12000, '#200000']
        ]

        return (
            <div className="legendContainer">
                {legendArray.map((crimeData, index) => {
                    return (
                        <div className="legend" key={index} style={{ backgroundColor: crimeData[1] }}></div>
                    )
                })}
            </div>
        )

 
    }

    render() {
        return (
            <div>

                <div id='map'>
                    <div id='geocoder' className='geocoder hide-geocoder'></div>
                    {this.legendDisplay()}
                    <div id="minContainer">Low</div>
                    <div id="maxContainer">High</div>
                </div>
                <div id='map-overlay' className='map-overlay'></div>
                <div ref={(element)=>{this.fab = element}} className="fixed-action-btn">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">search</i>
                    </a>
                    <ul>
                        <li><div className="btn-floating geocoder" id="geocoder"></div></li>
                        <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
                        <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
                        <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(GeneralMap);