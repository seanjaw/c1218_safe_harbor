import React, {Component, Fragment, createRef} from 'react';
import {withRouter, Link, Route}  from "react-router-dom";
import './tutorial.scss';
import GeneralMap from "../map/mapContainer";
import HowToModal from './howToModal';
import Chart from "../stats";

class HowToButton extends Component {
    constructor(props){
        super(props);

        this.tapTargetRef = createRef();
    }

    componentDidMount () {
        M.TapTarget.init(this.tapTargetRef.current);
        var instance = M.TapTarget.getInstance(this.tapTargetRef.current);

        if(this.props.isExpanded) {
            // tapTargetWrapper.classList.add('open');
            instance.open();
        }

        // if(path == '/' || path == '/violent' || path == '/property') {
        //     target.classList.add('open');
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        var instance = M.TapTarget.getInstance(this.tapTargetRef.current);

        if(this.props.isExpanded){
            instance.open();

        } else {
            instance.close();
        }
    }

    toggleHowTo =()=> {
        var tapTargetWrapper = this.tapTargetRef.current.M_TapTarget.wrapper;

        this.props.toggleExpanded();
        // if(this.state.isOpen){
        //     // instances[0].wrapper.classList.remove('open');
        //     target.classList.remove('open');
        //     // this.state.isOpen = false;
        //     this.setState({
        //         isOpen: false
        //     })
        //
        // } else {
        //     target.classList.add('open');
        //     // this.state.isOpen = true;
        //     this.setState({
        //         isOpen: true
        //     })
        // }
    }

    render() {
        return(
            <div onClick={this.toggleHowTo} id='tutorialContainer' className='fixed-action-btn direction-top'>
                <a id="tutMenu" className="waves-effect waves-light btn btn-floating"><i
                    className="material-icons">help</i></a>

                    <div className="tap-target" data-target="tutMenu" ref={this.tapTargetRef}>
                        <div className="tap-target-content">
                            <h5 className='center white-text'>About Us</h5>
                            <p className='center white-text tutorial-text'>The purpose of this application is to give you an understanding of the crimes committed in a specific area, or a specific crime throughout the city of Los Angeles.</p>
                            <p className='center white-text tutorial-text'>This application will pull data for the city of Los Angeles and will give the crimes that have been committed in the previous year.</p>
                            <button onClick={this.props.openModal} className='btn waves-effect waves-light howToBtn'>How To</button>
                        </div>
                    </div>
            </div>
        )
    }
}

export default withRouter(HowToButton);