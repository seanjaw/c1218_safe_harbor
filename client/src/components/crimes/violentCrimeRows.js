import React, {Component} from 'react';
import axios from "axios";
import ViolentCrimeEntry from './violentCrimeEntry';


class ViolentCrimeRows extends Component {
    state = {
        violentCrime: []
    }

    componentDidMount() {
        this.getViolentCrimes();
    }

    async getViolentCrimes() {
        const resp = await axios.get('/api/crimetype/violent');
        this.setState({
            violentCrime: resp.data.data
        });
    }

    render() {
        const violentCrime = this.state.violentCrime.slice(0,100).map( violentItem => {
            return <ViolentCrimeEntry key={violentItem['DR Number']}{...violentItem}/>
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
                          {violentCrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ViolentCrimeRows;
