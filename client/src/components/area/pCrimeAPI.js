import React, {Component} from 'react';
import axios from "axios";
import PCrimeEntry from './pCrimeEntry';
import {withRouter} from 'react-router-dom';


class PCrimeAPI extends Component {
    state = {
        vcrime: []
    }

    componentDidMount() {
        this.getPCrime();
    }

    async getPCrime() {
        const resp = await axios.get('/api'+ this.props.location.pathname);
        this.setState({
            pcrime: resp.data.geoJson.features
        });
    }

    render(){
        const pcrime = this.state.pcrime.slice(0,5).map( pcrimeItem => {
            return <PCrimeEntry key={pcrimeItem.properties['DRNumber']}{...pcrimeItem.properties}/>
        });
        return (
            <div>
                <div className="row center">
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">Report #</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pcrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(PCrimeAPI);
