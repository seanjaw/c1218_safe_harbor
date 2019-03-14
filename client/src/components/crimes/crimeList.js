import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViolentCrimesRows from './violentCrimeRows';
import PropertyCrimes from './propertyCrimes';
import TotalCrimes from './totalcrimes';

class CrimeList extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs z-depth-2 valign-wrapper">
                            <li className="active tab col s4 total">
                                <Link to="/">Total</Link>
                            </li>
                            <li className="tab col s4 violent">
                                <Link to="/violent">Violent</Link>
                            </li>
                            <li className="tab col s4 property">
                                <Link to="/property">Property</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="/">
                    {this.props.path === '/' ? <TotalCrimes/> : null}
                </div>
                <div id="violent">
                    {this.props.path === '/violent' ? <ViolentCrimesRows/> : null}
                </div>
                <div id="property">
                    {this.props.path === '/property' ? <PropertyCrimes/> : null}
                </div>
            </div>
        )
    }
}

export default CrimeList;
