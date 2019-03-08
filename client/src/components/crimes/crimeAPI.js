import React, {Component} from 'react';
import axios from "axios";
import VCrimeEntry from './vCrimeEntry';
import {withRouter} from 'react-router-dom';


class VCrimeAPI extends Component {
    state = {
        vcrime: []
    }

    componentDidMount() {
        this.getVCrime();
    }

    async getVCrime() {
        const resp = await axios.get('/api/'+ this.props.location.pathname);
        console.log('response:',resp);
        this.setState({
            vcrime: resp.data.geoJson.features
        });
    }

    render(){
        const vcrime = this.state.vcrime.slice(0,100).map( vCrimeItem => {
            console.log(vCrimeItem);
            return <VCrimeEntry key={vCrimeItem['DR Number']}{...vCrimeItem} onClick={()=>{

            }
            }/>
        });
        return (
            <div className="container col s12">
                <div className="row">
                    <table className="col s12">
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">Report #</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                           {vcrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(VCrimeAPI);
