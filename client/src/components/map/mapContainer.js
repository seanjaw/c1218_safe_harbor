import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import GeneralMap from './generalMap.js';
import AreaMap from "./arealMap";
import HowToButton from '../tutorial/howToButton';
import HowToModal from "../tutorial/howToModal";


class MapContainer extends Component {
    constructor(props) {
        super(props);
        const path = this.props.location.pathname;

        let data = sessionStorage.getItem('newVisitor');
        if(data == 'false'){
            data = false;
        } else if (data == 'true'){
            data = true;
        } else if (data == null){
            data = true;
        }
        this.state = {
            howToButtonExpanded: path === '/' && data,
            howToModalOpen: false
        }
    }

    howToButtonExpandedToggle = () => {

        const { howToButtonExpanded } = this.state;

        this.setState({
            howToButtonExpanded: !howToButtonExpanded
        });
    }

    howToModalOpen = () => {
        this.setState({
           howToModalOpen: true,
           howToButtonExpanded: false
        });
    }

    howToModalClosed = () => {
        this.setState({
            howToModalOpen: false
        });
    }

    render(){
        const path = this.props.location.pathname;
        const onHomePage = path === '/' || path === '/violent' || path === '/property';

        let mapType = null;

        if(onHomePage) {
            mapType = <GeneralMap/>;
        } else {
            mapType = <AreaMap/>;
        }

        return(
            <div>
                <HowToButton isExpanded={this.state.howToButtonExpanded} toggleExpanded={this.howToButtonExpandedToggle} openModal={this.howToModalOpen}/>
                { this.state.howToModalOpen ? <HowToModal closeModal={this.howToModalClosed}/> : '' }
                {mapType}
            </div>
        )
    }
}

export default withRouter(MapContainer);