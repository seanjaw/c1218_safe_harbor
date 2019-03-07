import React, {Component} from 'react';
import ViolentCrimeRows from './violentCrimeRows';

class ViolentCrimes extends Component {
    render(){
        return(
            <div className="container col s12">
                <ViolentCrimeRows/>
            </div>
        )
    }
}


export default ViolentCrimes;
