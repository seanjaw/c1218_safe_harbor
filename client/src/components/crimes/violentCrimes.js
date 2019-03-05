import React, {Component} from 'react';
import ViolentCrimeRows from './violentCrimeRows';

class ViolentCrimes extends Component {

    render(){
        return(
            <div className="row">
                <div className="col s12 m8">
                    <table>
                        <thead>
                        <tr className="blue-grey">
                            <th>Area</th>
                            <th>Crime</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            <ViolentCrimeRows/>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default ViolentCrimes;
