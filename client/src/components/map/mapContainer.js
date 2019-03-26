import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import GeneralMap from './generalMap.js';
import AreaMap from "./arealMap";
import Tutorial from '../tutorial';
import Howto from "../tutorial/howto";


class MapContainer extends Component {
    state = {
        path: [],
        modalIsOpen: false
    };

    componentDidMount(){
        this.setState({
            path: this.props.location.pathname
        });
    }

    toggleModal = () => {
        const { modalIsOpen } = this.state;

        this.setState({
            modalIsOpen: !modalIsOpen
        });
    }

    render(){
        // console.log('Map Path:', this.state.path);
        // console.log('Props: ', this.props.location.pathname);

        let path = this.props.location.pathname;
        let mapType = null;

        if(path == '/' || path == '/violent' || path == '/property') {
            mapType = <GeneralMap/>;
        } else {
            mapType = <AreaMap/>;
        }

        return(
            //if statement to determine which map to display based off path.
            //componentShouldUpdate if it should re-render based on current path and previous path
            <div>
                <Tutorial props={this.state.modalIsOpen} toggle={this.toggleModal}/>
                { this.state.modalIsOpen ? <Howto toggle={this.toggleModal}/> : '' }
                {mapType}
            </div>
        )
    }
}

export default withRouter(MapContainer);