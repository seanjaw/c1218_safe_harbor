import React, {Component} from 'react';
import ViolentCrimeRows from '../crimes/violentCrimeRows';

class DRNumber extends Component {

    render(){
        return(
            <div className="container col s12">
                <div className="row">
                    <div>
                        <table>
                            <thead>
                            <tr className="grey darken-4 z-depth-2">
                                <th className="center-align">Report #</th>
                                <th className="center-align">Area</th>
                                <th className="center-align">Crime</th>
                                <th className="center-align">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <ViolentCrimeRows/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default DRNumber;
