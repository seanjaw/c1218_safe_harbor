import React, {Component} from 'react';
import TotalCrimeRows from "./totalCrimeRows";

class TotalCrimes extends Component {

    render(){
        return(
            <div className="home">
                <div className="row">
                    <div className="col s4 m8">
                        <table>
                            <tbody>
                                <TotalCrimeRows/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default TotalCrimes;
