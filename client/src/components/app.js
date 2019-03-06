import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import HomePage from './homePage';
import {Route, Switch, withRouter} from 'react-router-dom';
import '../components/app.scss';
import MapContainer from "./map/mapContainer";
import AreaId from './area/areaId';
import CrimeId from './area/crimeId';

const App = () => (
    <div className="main-container">
        <MapContainer/>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/violent" component={HomePage}/>
            <Route exact path="/property" component={HomePage}/>
            <Route path="/area/:area_code" component={AreaId}/>
            <Route path="/crime/:crime_code" component={CrimeId}/>
            {/*<Route path="/stats/" component={Stats}/>*/}
        </Switch>
    </div>
);

export default App;
