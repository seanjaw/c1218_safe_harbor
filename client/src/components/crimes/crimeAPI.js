import React, {Component} from 'react';
import axios from "axios";
import CrimeEntry from './CrimeEntry';
import {withRouter} from 'react-router-dom';


class CrimeAPI extends Component {
    state = {
        crime: []
    }

    componentDidMount() {
        this.getCrime();
    }

    async getCrime() {
        const resp = await axios.get('/api'+ this.props.location.pathname);
        this.setState({
            crime: resp.data.geoJson.features
        });
    }

    render(){
        const crime = this.state.crime.slice(0,100).map( crimeItem => {
            return <CrimeEntry key={crimeItem.properties['DRNumber']}{...crimeItem.properties}/>
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
                           {crime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(CrimeAPI);
