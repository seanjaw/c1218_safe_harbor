import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import App from './app';

class Charts extends Component{
    render(){
        return(
            <div className="container">
                <h1>These are the charts</h1>
                <Route exact path="/" component={App}/>
            </div>
        )
    }
}

export default Charts;

//high order. pass in graphs
//generic chart component with basic chart, then components for specialized chart (line chart, graph chart etc) Only useful if there are multiple charts and types of data for charts (time, location etc)