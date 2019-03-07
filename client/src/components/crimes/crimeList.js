import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViolentCrimes from './violentCrimes';
import PropertyCrimes from './propertyCrimes';
import TotalCrimes from './totalcrimes';

class CrimeList extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs z-depth-2 valign-wrapper">
                            <li className="active tab col s4">
                                <Link to="/">Total</Link>
                            </li>
                            <li className="tab col s4">
                                <Link to="/violent">Violent</Link>
                            </li>
                            <li className="tab col s4">
                                <Link to="/property">Property</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="/" className="col s12">
                    {this.props.path === '/' ? <TotalCrimes/> : null}
                </div>
                <div id="violent" className="violent col s12">
                    {this.props.path === '/violent' ? <ViolentCrimes/> : null}
                </div>
                <div id="property" className="col s12">
                    {this.props.path === '/property' ? <PropertyCrimes/> : null}
                </div>
            </div>
        )
    }
}

export default CrimeList;
