import React, {Component} from 'react';
import PropertyCrimeRows from './propertyCrimesRows';

class PropertyCrimes extends Component {

    render(){
        return(
            <div className="container col s12">
                <div className="row">
                    <div>
                        <table>
                            <thead>
                            <tr className="indigo darken-4 z-depth-2">
                                <th className="center-align">Report #</th>
                                <th className="center-align">Area</th>
                                <th className="center-align">Crime</th>
                                <th className="center-align">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                <PropertyCrimeRows/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default PropertyCrimes;
