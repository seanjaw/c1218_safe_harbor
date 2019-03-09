import React, {Component} from 'react';
import axios from "axios";
import FilteredCrimeEntry from './filteredcrimeentry';
import {withRouter} from 'react-router-dom';


class FilteredCrimeAPI extends Component {
    state = {
        filtercrime: []
    }

    componentDidMount() {
        this.filterCrime();
    }

    async filterCrime() {
        const resp = await axios.get('/api/area/'+this.areaId+'/crimes/'+this.code);
        this.setState({
            crime: resp.data.geoJson.features
        });
    }

    render(){
        const filtercrime = this.state.fitlercrime.slice(0,100).map( filteredcrimeItem => {
            return <FilteredCrimeEntry key={filteredcrimeItem.properties['DRNumber']}{...filteredcrimeItem.properties}/>
        });
        return (
            <div>
                <div className="row center">
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">Report#</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtercrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(FilteredCrimeAPI);
