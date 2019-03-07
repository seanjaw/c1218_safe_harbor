import React, {Component} from 'react';
import axios from "axios";
// import {Link} from 'react-router-dom';
// import AreaId from '../area/areaId';
// import CrimeId from '../area/crimeId';

class PropertyCrimeRows extends Component {
    state = {
        propertyCrime: ''
    }

    componentDidMount() {
        this.getPropertyCrimes();
    }

    async getPropertyCrimes() {
        const resp = await axios.get('/api/crimetype/property');

        console.log(resp);

        this.setState({
            propertyCrime: resp.data.propertyCrimeData
        });
    }

    render() {
        // const {area, crimeType, dateOccured} = this.state.violentCrime;
        //checking if this state has a truthy value, pull info from it
        if (this.state.propertyCrime) {
            const area = this.state.propertyCrime[0].area.name;
            const crimeType = this.state.propertyCrime[0].crimeType.description;
            const dateOccured = this.state.propertyCrime[0].dateOccured;
            return (
                <tr>
                    <td className="center-align">46464</td>
                    <td className="center-align">{area}</td>
                    <td className="center-align">{crimeType}</td>
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

export default PropertyCrimeRows;



