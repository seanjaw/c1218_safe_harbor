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
import Chart from './stats/chart'
import DrId from './area/dr';


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
                    <Route path="/crime/:crime_code" component={CrimeId}/>
                    {/*<Route path="/stats/" component={Stats}/>*/}
                </Switch>
            </div>
        )
    }
};

export default App;
