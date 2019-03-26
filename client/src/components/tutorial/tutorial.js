import React, {Component, Fragment} from 'react';
import {withRouter, Link, Route}  from "react-router-dom";
import './tutorial.scss';
import GeneralMap from "../map/mapContainer";
import Howto from './howto';
import Chart from "../stats";

class Tutorial extends Component {
    constructor(props){
        super(props);
        console.log(props.props);

    }

    state = {
        isOpen: true,
        instances: null
    }

    triggerModal () {
        var target = document.getElementById('modal1');

        target.classList.remove('modal');
        target.classList.add('modalDisplay');
    }

    componentDidMount () {
        var elems = document.querySelectorAll('.tap-target');
        // var instance = M.TapTarget.getInstance(elems);

        this.setState({
            instances: M.TapTarget.init(elems)
        });

        document.querySelector('.tap-target-wrapper').id = 'tap-target-wrapper';
        var target = document.getElementById('tap-target-wrapper');

        let path = this.props.location.pathname;

        if(path == '/' || path == '/violent' || path == '/property') {
            target.classList.add('open');
        }
        // instances[0].wrapper.classList.add('open');
    }

    controlMenu =()=> {
        var target = document.getElementById('tap-target-wrapper');
        if(this.state.isOpen){
            // instances[0].wrapper.classList.remove('open');
            target.classList.remove('open');
            // this.state.isOpen = false;
            this.setState({
                isOpen: false
            })

        } else {
            target.classList.add('open');
            // this.state.isOpen = true;
            this.setState({
                isOpen: true
            })
        }
    }

    render() {
        return(
            <div onClick={this.controlMenu} id='tutorialContainer' className='fixed-action-btn direction-top'>
                <a id="tutMenu" className="waves-effect waves-light btn btn-floating"><i
                    className="material-icons">help</i></a>

                    <div className="tap-target" data-target="tutMenu">
                        <div className="tap-target-content">
                            <h5 className='center white-text'>About Us</h5>
                            <p className='center white-text tutorial-text'>The purpose of this application is to give you an understanding of the crimes committed in a specific area, or a specific crime throughout the city of Los Angeles.</p>
                            <p className='center white-text tutorial-text'>This application will pull data for the city of Los Angeles and will give the crimes that have been committed in the previous year.</p>
                            {/*<Link to={this.triggerModal} className='btn waves-effect waves-light howToBtn'>How To</Link>*/}
                            <button onClick={this.triggerModal}className='btn waves-effect waves-light howToBtn'>How To</button>
                            {/*<a className="btn waves-effect waves-light howToBtn" href="#modal1">How To</a>*/}
                            {/*<button data-target="modal1" className="btn modal-trigger">Modal</button>*/}
                        </div>
                    </div>
            </div>
        )
    }
}

export default withRouter(Tutorial);