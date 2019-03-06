import React, {Component} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
// import AreaId from '../area/areaId';
// import CrimeId from '../area/crimeId';

class ViolentCrimeRows extends Component {
    state = {
        violentCrime: ''
    }

    componentDidMount() {
        this.getViolentCrimes();
    }

    async getViolentCrimes() {
        const resp = await axios.get('/api/violent');


        this.setState({
            violentCrime: resp.data.violentCrimeData
        });
    }

    render() {
        // const {area, crimeType, dateOccured} = this.state.violentCrime;
        //checking if this state has a truthy value, pull info from it
        if (this.state.violentCrime) {
            const area = this.state.violentCrime[0].area.name;
            const crimeType = this.state.violentCrime[0].crimeType.description;
            const dateOccured = this.state.violentCrime[0].dateOccured;
            return (
                <tr>
                    <td className="center-align"><Link to="/dr/392837">392837</Link></td>
                    <td className="center-align"><Link to="/area/4">{area}</Link></td>
                    <td className="center-align"><Link to="/crime/8">{crimeType}</Link></td>
                    <td className="center-align">{dateOccured}</td>
                </tr>
            )}else{
                return (
                    <tr className="z-depth-5 floating blue-grey lighten-3">
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )
            }
        }
    }

//conditional check, one for no data one for data

export default ViolentCrimeRows;



