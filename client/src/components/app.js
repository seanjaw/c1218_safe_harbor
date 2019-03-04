import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import Map from './map';
import Stats from './stats';
import Charts from './charts';
import {Route} from 'react-router-dom';




const App = () => (
    <div className="container">
        <h1 className="center pulse z-depth-5 floating blue-grey lighten-3">Safe Harbor</h1>
        <Route path="/" component={Map}/>
        <Route path="/stats" component={Stats}/>
        <Route path="/charts" component={Charts}/>
    </div>
);

export default App;
