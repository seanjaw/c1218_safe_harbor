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
import FilterCrimes from './crimes/filtercrimes';


const App = () => {
    if(window.location.pathname==='/stats'){
        return (
            <Route path="/stats" component={Chart}/>
        )
    }
    else{
        return(
            <div className="outer-div">
                <MapContainer/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/violent" component={HomePage}/>
                    <Route exact path="/property" component={HomePage}/>
                    <Route path="/area/:area_code" component={AreaId}/>
                    <Route path="/crimes/:crime_code" component={CrimeId}/>
                    <Route path="/filtered-crimes/:area/:crime_code" component={FilterCrimes}/>
                    <Route path="/dr/:dr_number" component={DrId}/>
                </Switch>
            </div>
        )
    }
};

export default App;
