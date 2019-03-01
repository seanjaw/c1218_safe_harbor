import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Charts extends Component{
    async componentDidMount(){
        const resp = await axios.get('/api/charts');
        
    }

    render(){
        return(
            <div className="container">
                <h1>These are the charts</h1>
            </div>
        );
    }
}
//<Link to="/"/>
export default Charts;

//high order. pass in graphs
//generic chart component with basic chart, then components for specialized chart (line chart, graph chart etc) Only useful if there are multiple charts and types of data for charts (time, location etc)