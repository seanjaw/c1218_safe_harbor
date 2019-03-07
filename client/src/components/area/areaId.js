import React, {Component} from 'react';
import ViolentCrimeRows from '../crimes/violentCrimeRows';

class ViolentCrimes extends Component {
    render(){
        return(
            <div className="container col xs12">
                <ViolentCrimeRows/>
            </div>
        )
    }
}


export default ViolentCrimes;
