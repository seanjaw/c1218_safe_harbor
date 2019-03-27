import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViolentCrimesRows from './violentCrimeRows';
import PropertyCrimesRows from './propertyCrimesRows';
import TotalCrimesRows from './totalCrimeRows';
import './crimeList.scss'

class CrimeList extends Component{
    constructor(props){
        super(props);

        document.onscroll = this.showScrollButton;
    }

    showScrollButton() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollButton").style.display = "block";
        } else {
            document.getElementById("scrollButton").style.display = "none";
        }
    }

    goToTop=()=>{
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
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
                    {this.props.path === '/' ? <TotalCrimesRows/> : null}
                </div>
                <div id="violent">
                    {this.props.path === '/violent' ? <ViolentCrimesRows/> : null}
                </div>
                <div id="property">
                    {this.props.path === '/property' ? <PropertyCrimesRows/> : null}
                </div>
                <a onClick={this.goToTop} id="scrollButton" className="btn-floating btn waves-effect waves-light blue backButton">
                    <i className="large material-icons center-align centerArrow">arrow_upward</i>
                </a>
            </div>
        )
    }
}

export default CrimeList;
