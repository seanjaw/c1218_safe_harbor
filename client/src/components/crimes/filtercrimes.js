import React, {Component} from 'react';
import axios from "axios";
import FilterCrimeEntry from './filtercrimesEntry';
import {Link} from "react-router-dom";


class FilterCrimes extends Component {
    state={
        crimeObj : []
    }

    componentDidMount(){
        this.filterCrime();
    }

    async filterCrime(){
        const resp = await axios.get('/api/'+this.props.location.pathname);
        this.setState({
            crimeObj: resp.data.geoJson.features
        });
    }

    render() {
        const crimeObj = this.state.crimeObj.slice(0,100).map( filterItem => {
            return <FilterCrimeEntry key={filterItem.properties.DRNumber}{...filterItem.properties}/>
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs z-depth-2 valign-wrapper">
                            <li className="active tab col s4">
                                <Link to="/">Total</Link>
                            </li>
                            <li className="tab col s4">
                                <Link to="/violent">Violent</Link>
                            </li>
                            <li className="tab col s4">
                                <Link to="/property">Property</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            <div>
                <div className="row center">
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align dr">DR Number</th>
                            <th className="center-align areadr">Area</th>
                            <th className="center-align areaid">Area ID</th>
                            <th className="center-align description">Description</th>
                            <th className="center-align dateoccurred">Date Occurred</th>
                            <th className="center-align timeoccurred">Time Occurred</th>
                        </tr>
                        </thead>
                        <tbody>
                            {crimeObj}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

export default FilterCrimes;


