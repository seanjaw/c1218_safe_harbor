import React, {Component} from 'react';
import axios from "axios";
import PropertyCrimeEntry from "./propertyCrimeEntry";


class PropertyCrimeRows extends Component {
    state = {
        propertyCrime: []
    }

    componentDidMount() {
        this.getPropertyCrimes();
    }

    async getPropertyCrimes() {
        const resp = await axios.get('/api/crimetype/property');
        this.setState({
            propertyCrime: resp.data.data
        });
    }

    render() {
        const propertyCrime = this.state.propertyCrime.slice(0,100).map( propertyItem => {
            return <PropertyCrimeEntry key={propertyItem['DR Number']}{...propertyItem}/>
        });

        return (
            <div>
                <div className="row center">
                    <table>
                        <thead>
                            <tr className="grey lighten-2 z-depth-2">
                                <th className="center-align">Report #</th>
                                <th className="center-align">Area</th>
                                <th className="center-align">Crime</th>
                                <th className="center-align">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propertyCrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PropertyCrimeRows;
