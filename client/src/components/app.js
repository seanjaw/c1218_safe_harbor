import React, {Component, Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/map.scss'
import '../assets/css/app.scss';
import HomePage from './homePage';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
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
            <Fragment>
                <Route path="/stats" component={Chart}/>
                <Link to="/" className="btn-floating btn waves-effect waves-light blue backButton">
                    <i className="large material-icons center-align">arrow_back</i>
                </Link>
            </Fragment>
            
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
