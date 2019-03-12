import React, {Component} from 'react';
import CrimeAPI from '../crimes/crimeAPI';

class CrimeId extends Component {
    render(){
        return(
            <div>
                <CrimeAPI/>
            </div>
        )
    }
}


export default CrimeId;
