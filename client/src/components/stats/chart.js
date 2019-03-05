import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BarChart from './barChart';
import PieChart from './pieChart';
import GraphChart from './graphChart';

class Chart extends Component{
    async componentDidMount(){
        const resp = await axios.get('/api/stats');
    }

    render(){
        return(
            <div className="container">
                <h1>These are the charts</h1>
                <BarChart/>
                <GraphChart/>
                <PieChart/>
            </div>
        );
    }
}
//<Link to="/"/>
export default Chart;
