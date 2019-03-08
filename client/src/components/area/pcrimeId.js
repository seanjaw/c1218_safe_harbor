import React, {Component} from 'react';
import PCrimeAPI from './pCrimeAPI';

class PcrimeId extends Component {
    render(){
        return(
            <div className="container col xs12">
                <PCrimeAPI/>
            </div>
        )
    }
}


export default PcrimeId;
