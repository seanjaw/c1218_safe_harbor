import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BarChart from './barChart';
import PieChart from './pieChart';
import GraphChart from './graphChart';
import './chart.scss'

class Chart extends Component{
    async componentDidMount(){
    }

    render(){
        return(
            <div className="graphContainer">
                <div className="chart-container">
                    <GraphChart/>
                    <BarChart/>
                    <PieChart/>
                </div>
            </div>
        );
    }
}
export default Chart;
