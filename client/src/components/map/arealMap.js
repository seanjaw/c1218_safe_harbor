import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZXBhZGlsbGExODg2IiwiYSI6ImNqc2t6dzdrMTFvdzIzeW41NDE1MTA5cW8ifQ.wmQbGUhoixLzuiulKHZEaQ';
import './map.scss';

class AreaMap extends Component {
    state = {
        area: [],
        zoom: 10,
        center: [-118.2424995303154, 34.05319943190001],
        rotate: true,
        feature: false
    };

    rotateCamera = (timestamp) => {
        // clamp the rotation between 0 -360 degrees
        // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
        this.map.rotateTo((timestamp / 100) % 360, {duration: 0});
        // Request the next frame of the animation.
        if(this.state.rotate){
            requestAnimationFrame(this.rotateCamera);
        }
    }

    async getData() {
        let path = this.props.location.pathname;
        let axiosData = null;
        let zoom = 0;
        let center = [-118.2424995303154, 34.05319943190001];

        if(path.match( '/crime/' )){
            let crimeNum = path.match( /crime\/(\d+)/ )[1];
            axiosData = await axios.get(`/api/crimes/210`);
            let crimeCount = axiosData.data.geoJson.features.length;
            console.log('Crime Count: ', crimeCount);
            center = axiosData.data.geoJson.features[0].geometry.coordinates;
            axiosData = axiosData.data.geoJson;
            zoom = 10;
        } else if(path.match( '/area/' )){
            let areaNum = path.match( /area\/(\d+)/ )[1];
            axiosData = await axios.get(`/api/area/${areaNum}`);
            let crimeCount = axiosData.data.geoJson.features.length;
            console.log('Crime Count: ', crimeCount);
            console.log(axiosData);
            center = axiosData.data.geoJson.features[0].geometry.coordinates;
            axiosData = axiosData.data.geoJson;
            zoom = 11;
        } else if( path.match( '/dr/' ) ) {
            let drNum = path.match( /dr\/(\d+)/ )[1];
            axiosData = await axios.get('/api/crimes/210');
            let crimeCount = axiosData.data.geoJson.features.length;
            console.log('Crime Count: ', crimeCount);
            let randomNum = Math.floor(Math.random() * crimeCount);
            console.log(axiosData);
            center = axiosData.data.geoJson.features[randomNum].geometry.coordinates;
            axiosData = axiosData.data.geoJson.features[randomNum];
            zoom = 18;

        } else {
            console.log('No Match');
            return;
        }

        this.setState({
            area: axiosData,
            zoom: zoom,
            center: center,
        });
        this.createMap();
    }

    componentDidMount(){
        this.getData();
        console.log('ComponentDidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.pathname !== this.props.location.pathname){
            // console.log('Different Name:');
            this.getData();
        }
    }

    createMap() {
        let testGeoCrime = this.state.area;
        let center = this.state.center;
        let zoom = this.state.zoom;

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: center,
            zoom: zoom,
            pitch: 45
        });

        this.map.on('style.load', () => {
            this.rotateCamera(0);
            this.map.addControl(new mapboxgl.FullscreenControl());

            if(!document.getElementById("menu")) {
                let link = document.createElement('div');
                link.id = 'menu';
                let mapDiv = document.getElementById('map');
                let featureLink = document.createElement('pre');
                featureLink.id = 'features';
                mapDiv.appendChild(link);
                mapDiv.appendChild(featureLink);
                this.createMenu();
            }

            /**
             * Allow the ability to create 3D Buildings
             * */
                // Insert the layer beneath any symbol layer.
            var layers = this.map.getStyle().layers;

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }

            this.map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);

            /**
             * Adding the source for the crime data
             * Display the data with heat maps and pin points
             * */
            this.map.addSource('crimes', {
                type: 'geojson',
                // data: 'https://data.lacity.org/resource/7fvc-faax.geojson'
                data: testGeoCrime
            });

            // add heatmap layer here
            this.map.addLayer({
                id: 'crimes-heat',
                type: 'heatmap',
                source: 'crimes',
                maxzoom: 15,
                paint: {
                    // increase weight as diameter breast height increases
                    'heatmap-weight': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                        stops: [
                            [11, 1],
                            [15, 3]
                        ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0, 'rgba(236,2,2,0)',
                        0.2, 'rgb(208,2,2)',
                        0.4, 'rgb(166,1,2)',
                        0.6, 'rgb(103,1,2)',
                        0.8, 'rgb(28,1,1)'
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                        stops: [
                            [11, 15],
                            [15, 20]
                        ]
                    },
                    // decrease opacity to transition into the circle layer
                    'heatmap-opacity': {
                        default: 1,
                        stops: [
                            [14, 1],
                            [15, 0]
                        ]
                    },
                }
            }, 'waterway-label');

            // add circle layer here
            this.map.addLayer({
                id: 'crimes-point',
                type: 'circle',
                source: 'crimes',
                minzoom: 14,
                paint: {
                    // increase the radius of the circle as the zoom level and dbh value increases
                    'circle-radius': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [{ zoom: 15, value: 1 }, 5],
                            [{ zoom: 15, value: 62 }, 10],
                            [{ zoom: 22, value: 1 }, 20],
                            [{ zoom: 22, value: 62 }, 50],
                        ]
                    },
                    'circle-color': {
                        property: 'dbh',
                        type: 'exponential',
                        stops: [
                            [0, 'rgba(236,222,239,0)'],
                            [10, 'rgb(236,222,239)'],
                            [20, 'rgb(208,209,230)'],
                            [30, 'rgb(166,189,219)'],
                            [40, 'rgb(103,169,207)'],
                            [50, 'rgb(28,144,153)'],
                            [60, 'rgb(1,108,89)']
                        ]
                    },
                    'circle-stroke-color': 'red',
                    'circle-stroke-width': 1,
                    'circle-opacity': {
                        stops: [
                            [14, 0],
                            [15, 1]
                        ]
                    }
                }
            }, 'waterway-label');


            this.map.on('click', 'crimes-point', (e) => {
                // debugger;
                new mapboxgl.Popup()
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML('<b>Crime:</b> ' + e.features[0].properties.description + '<br><b>Date:</b> ' + e.features[0].properties["Date Occurred"])
                    .addTo(this.map);

                console.log(e.features[0].properties);

                var features = e.features[0];
                document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
            });

        });
    }

    createMenu =()=> {
        /**
         * Creates Toggle buttons for the map to display/hide certain IDS
         * */
        var toggleIds = ['features', 'Rotate-Camera'];
        for (var i = 0; i < toggleIds.length; i++) {
            var id = toggleIds[i];

            var link = document.createElement('a');
            link.href = '#';
            link.className = 'active userSelections';
            link.textContent = id;

            link.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();

                if(e.target.classList.contains('active')) {
                    e.target.className = '';
                } else {
                    e.target.className = 'active';
                }

                let buttonClicked = e.target.innerHTML;

                if(buttonClicked == 'Rotate-Camera') {
                    let rotateState;
                    if(this.state.rotate) {
                        rotateState = false;

                    } else {
                        rotateState = true;
                        // this.createMap();
                    }

                    this.setState({
                        rotate: rotateState
                    });
                    this.rotateCamera(0);
                } else if (buttonClicked == 'features') {
                    console.log('features');
                    if(!this.state.feature) {
                        console.log('Feature: false');

                        document.getElementById('features').style.display = 'block';
                        this.setState({
                            feature: true
                        })
                    } else {
                        console.log('Feature: true');
                        document.getElementById('features').style.display = 'none';
                        this.setState({
                            feature: false
                        })
                    }

                }

                // $('#' + this.innerText).toggle();
            };

            var layers = document.getElementById('menu');
            layers.appendChild(link);
        }
    }

    render(){
        return(
            <div>
                <div id='map'/>
            </div>
        )
    }
}
export default withRouter(AreaMap);