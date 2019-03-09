import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/map.scss'
import '../assets/css/app.scss';
import HomePage from './homePage';
import {Route, Switch, withRouter} from 'react-router-dom';
import '../components/app.scss';
import MapContainer from "./map/mapContainer";
import AreaId from './area/areaId';
import CrimeId from './area/crimeId';
import Chart from './stats/chart'
import DrId from './area/dr';
import FilteredCrime from "./crimes/filteredcrime";


const App = () => {
    if(window.location.pathname==='/stats'){
        return (
            <div className="main-container">
                <Route path="/stats" component={Chart}/>
            </div>
        )
    }
    else{
        return(
            <div>
                <MapContainer/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/violent" component={HomePage}/>
                    <Route exact path="/property" component={HomePage}/>
                    <Route path="/dr/:dr_number" component={DrId}/>
                    <Route path="/area/:area_code" component={AreaId}/>
                    <Route path="/crimes/:crime_code" component={CrimeId}/>
                    <Route path="/filtered-crime/:area/:crime_code" component={FilteredCrime}/>
                </Switch>
            </div>
        )
    }
};

export default App;
