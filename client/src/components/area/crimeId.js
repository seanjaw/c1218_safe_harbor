import React, {Component} from 'react';
import VCrimeAPI from '../crimes/crimeAPI';

class CrimeId extends Component {
    render(){
        return(
            <div className="container col xs12">
                <VCrimeAPI/>
            </div>
        )
    }
}


export default CrimeId;
