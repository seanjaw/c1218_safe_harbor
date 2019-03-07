import React, {Component} from 'react';
import TotalCrimeRows from "./totalCrimeRows";
import {withRouter} from 'react-router-dom'

class TotalCrimes extends Component {

    render(){
        return(
            <div className=" container home">
                <div className="row">
                    <div className="col s12 center-align">
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

export default withRouter(TotalCrimes);
