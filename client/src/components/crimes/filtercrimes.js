import React, {Component} from 'react';
import axios from "axios";
import FilterCrimeEntry from './filtercrimesEntry';


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
            <div>
                <div className="row center">
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">DR Number</th>
                            <th className="center-align">Area</th>
                            <th className="center-align">Area ID</th>
                            <th className="center-align">Description</th>
                            <th className="center-align">Date Occurred</th>
                            <th className="center-align">Time Occurred</th>
                        </tr>
                        </thead>
                        <tbody>
                            {crimeObj}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default FilterCrimes;


