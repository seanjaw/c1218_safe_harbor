import React, {Component} from 'react';
import TotalCrimeRows from "./totalCrimeRows";
import {withRouter} from 'react-router-dom'

class TotalCrimes extends Component {

    render(){
        return(
            <div className="container home">
                <div className="col s12 center-align">
                    <TotalCrimeRows/>
                </div>
            </div>
        )
    }
}

export default withRouter(TotalCrimes);
