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
        feature: false,
        crimeCount: 0,
        flyTo: false
    };

    rotateCamera = (timestamp) => {
        if(this.state.flyTo == true){
            this.flyToHome();
            this.state.flyTo = false;
            return;
        }
        this.map.rotateTo((timestamp / 100) % 360, {duration: 0});

        if(this.state.rotate){
            requestAnimationFrame(this.rotateCamera);
        }
    }
 
    async getData() {
        let path = this.props.location.pathname;
        let axiosData = null;
        let zoom = 0;
        let center = [-118.2424995303154, 34.05319943190001];
        let crimeCount = 0;

        if(path.match( '/crimes/' )){
            let crimeNum = path.match( /crimes\/(\d+)/ )[1];
            axiosData = await axios.get(`/api/crimes/${crimeNum}`);
            crimeCount = axiosData.data.geoJson.features.length;
            center = axiosData.data.geoJson.features[0].geometry.coordinates;
            axiosData = axiosData.data.geoJson;
            zoom = 10;
        } else if(path.match( '/area/' )){
            let areaNum = path.match( /area\/(\d+)/ )[1];
            axiosData = await axios.get(`/api/area/${areaNum}`);
            crimeCount = axiosData.data.geoJson.features.length;
            center = axiosData.data.geoJson.features[0].geometry.coordinates;
            axiosData = axiosData.data.geoJson;
            zoom = 11;
        } else if( path.match( '/dr/' ) ) {
            let drNum = path.match( /dr\/(\d+)/ )[1];
            axiosData = await axios.get(`/api/dr/${drNum}`  );
            crimeCount = axiosData.data.geoJson.features.length;
            center = axiosData.data.geoJson.features[0].geometry.coordinates;
            axiosData = axiosData.data.geoJson.features[0];
            zoom = 18;
        } else if ( path.match( '/filtered-crimes/' ) ) {
            let areaNum = path.match( /filtered-crimes\/(\d+)/ )[1];
            let crimeNum = path.match( /filtered-crimes\/(\d+)\/(\d+)/ )[2];
            axiosData = await axios.get(`/api/filtered-crimes/${areaNum}/${crimeNum}`  );
            crimeCount = axiosData.data.geoJson.features.length;
            center = axiosData.data.geoJson.features[0].geometry.coordinates;
            axiosData = axiosData.data.geoJson;
            zoom = 10;
        } else {
            console.log('No Match');
            return;
        }

        this.setState({
            area: axiosData,
            zoom: zoom,
            center: center,
            crimeCount: crimeCount
        });
        this.createMap();
    }

    crimeCountDisplay = () => {
        let crimeCount = this.state.crimeCount;

        let mapDiv = document.getElementById('map');
        let crimeCountPre = document.createElement('pre');
        let crimeCountSpan = document.createElement('span');

        crimeCountPre.id = 'crimeCountContainer';
        crimeCountSpan.innerText = 'Crime Count: '+crimeCount;
        mapDiv.append(crimeCountPre);
        crimeCountPre.append(crimeCountSpan);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.pathname !== this.props.location.pathname){
            this.getData();
        }
    }

    createMap() {
        let testGeoCrime = this.state.area;
        let center = this.state.center;
        let zoom = this.state.zoom;

        var bounds = [
            [-122.568165, 27.008172], // Southwest coordinates
            [-114.150626, 38.458773]  // Northeast coordinates
        ];

        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/seanjaw/cjt64wtdo58f11eki1ehjb7hx',
            center: center,
            zoom: zoom,
            pitch: 45,
            minZoom: 7,
            maxZoom: 20,
            maxBounds: bounds
        });

        this.map.on('style.load', () => {
            this.rotateCamera(0);
            this.map.addControl(new mapboxgl.FullscreenControl());

            if(!document.getElementById("menu")) {
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
                this.createFeatureButtonLink();
                new mapboxgl.Popup()
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML('<a href="/dr/' + e.features[0].properties.DRNumber + '">' + '<b>Crime:</b> ' + e.features[0].properties.description + '<br><b>Date:</b> ' + e.features[0].properties["Date Occurred"] + '</a>')
                    .addTo(this.map);
                var features = e.features[0];
                this.moreInfoData(features);
            });
        });
        this.crimeCountDisplay();
    }

    moreInfoData(features) {
        let featuresPreTag = document.getElementById('features');
        let featurePTag = document.createElement('p');

        while (featuresPreTag.firstChild) {
            featuresPreTag.removeChild(featuresPreTag.firstChild);
        }

        featurePTag.setAttribute('style', 'white-space: pre');
        featurePTag.classList.add('featureInfo');
        featurePTag.textContent = 'Area Name: ' + features.properties['Area Name'] + '\r\n';
        featurePTag.textContent += 'Crime Code: ' + features.properties['Crime Code'] + '\r\n';
        featurePTag.textContent += 'DRNumber: ' + features.properties['DRNumber'] + '\r\n';
        featurePTag.textContent += 'Date Occurred: ' + features.properties['Date Occurred'] + '\r\n';
        featurePTag.textContent += 'Time Occurred: ' + features.properties['Time Occurred'] + '\r\n';
        featurePTag.textContent += 'Description: ' + features.properties['description'] + '\r\n';
        featurePTag.textContent += 'Lng: ' + features.geometry.coordinates[0] + '\r\n';
        featurePTag.textContent += 'Lat: ' + features.geometry.coordinates[1];

        featuresPreTag.append(featurePTag);
    }

    createMenu =()=> {
        let mapDiv = document.getElementById('map');
        let menuLink = document.createElement('div');
        let featureLink = document.createElement('pre');
        let backButtonLink = document.createElement('i');
        let rotateCameralink = document.createElement('i');
        let flyToLink = document.createElement('i');
        let homeButtonLink = document.createElement('i');

        featureLink.id = 'features';
        menuLink.id = 'menu';
        backButtonLink.id = 'backButton';
        backButtonLink.classList.add('material-icons');
        backButtonLink.setAttribute('title', 'Go back');
        homeButtonLink.id = 'homeButton';
        homeButtonLink.classList.add('material-icons');
        homeButtonLink.setAttribute('title', 'Go home');
        rotateCameralink.id = 'rotateCamera';
        rotateCameralink.classList.add('material-icons');
        rotateCameralink.setAttribute('title', 'Toggle camera rotate');
        flyToLink.id = 'flyTo';
        flyToLink.classList.add('material-icons');
        flyToLink.setAttribute('title', 'Center camera');

        mapDiv.appendChild(menuLink);
        mapDiv.appendChild(featureLink);
        // mapDiv.appendChild(backButtonLink);
        let menuDiv = document.getElementById("menu");
        menuDiv.appendChild(homeButtonLink);
        document.getElementById('homeButton').innerText = 'home';
        document.getElementById('homeButton').addEventListener('click', this.goToHome);
        menuDiv.appendChild(backButtonLink);
        document.getElementById('backButton').innerHTML = 'arrow_back';
        document.getElementById('backButton').addEventListener('click', this.goBack);
        menuDiv.appendChild(rotateCameralink);
        document.getElementById('rotateCamera').innerHTML = 'rotate_right';
        document.getElementById('rotateCamera').addEventListener('click', this.rotateCameraButton);
        menuDiv.appendChild(flyToLink);
        document.getElementById('flyTo').innerHTML = 'location_searching';
        document.getElementById('flyTo').addEventListener('click', this.flyToHome);
    }

    flyToHome = () => {
        this.setState({
            rotate: false,
            flyTo: true
        });

        this.map.flyTo({
            center: this.state.center,
            zoom: this.state.zoom
        });

    }

    createFeatureButtonLink =()=> {
        let menuDiv = document.getElementById("menu");

        let featureButtonLink = document.createElement('i');
        featureButtonLink.id = 'featureButton';
        featureButtonLink.classList.add('material-icons');
        featureButtonLink.setAttribute('title', 'More Information');

        menuDiv.appendChild(featureButtonLink);
        document.getElementById('featureButton').innerHTML = 'info_outline';
        document.getElementById('featureButton').addEventListener('click', this.featureButton);

    }

    goToHome = () => {
        this.props.history.push('/');
    }

    goBack = () => {
        this.props.history.goBack();
    }

    rotateCameraButton = () => {
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
    }

    featureButton = () => {
        if(!this.state.feature) {
            document.getElementById('features').style.display = 'block';
            this.setState({
                feature: true
            })
        } else {
            document.getElementById('features').style.display = 'none';
            this.setState({
                feature: false
            })
        }
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        const { area } = this.state;

        if (area == null || area.length == 0){
            return (
                <div className='spinnerContainer'>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-red">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div id='map'/>
                </div>
            )
        }
    }
}
export default withRouter(AreaMap);