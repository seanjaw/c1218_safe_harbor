import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BarChart from './barChart';
import PieChart from './pieChart';
import GraphChart from './graphChart';
import './chart.scss'

class Chart extends Component{
    async componentDidMount(){
        //const resp = await axios.get('/api/stats');
    }

    render(){
        return(
            <div className="graphContainer">
                <h1>Crimes By Month</h1>
                <GraphChart/>
                <h1>Total Crimes by Area</h1>
                <BarChart/>
                <h1>Total Crimes In The Last Year</h1>
                <PieChart/>
            </div>
        );
    }
}
//<Link to="/"/>
export default Chart;
