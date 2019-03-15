import React, {Component, Fragment} from 'react';
import axios from "axios";
import FilterCrimeEntry from './filtercrimesEntry';
import {Link} from "react-router-dom";
import MapContainer from "../map/mapContainer";


class FilterCrimes extends Component {
    state={
        crimeObj : [],
        showStickyHeader: false
    }

    handleScroll = this.handleScroll.bind(this);

    componentDidMount() {
        this.filterCrime();
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        const thead = document.getElementsByTagName('thead')[0];
        const bounds = thead.getBoundingClientRect();
        if (!this.state.showStickyHeader && bounds.top < 0){
            this.setState({
                showStickyHeader: true
            })
        } else if (this.state.showStickyHeader && bounds.top > 0){
            this.setState({
                showStickyHeader: false
            })
        }
    }

    async filterCrime(){
        const resp = await axios.get('/api/'+this.props.location.pathname);
        this.setState({
            crimeObj: resp.data.geoJson.features
        });
    }

    render() {
        const crimeObj = this.state.crimeObj.slice(0,100).map( filterItem => {
            return <FilterCrimeEntry key={filterItem.properties.DRNumber}{...filterItem.properties}/>
        });

        const stickyStyles = {
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        };

        return (
            <Fragment>
                <MapContainer/>
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
                <div className="outer-div">
                    <div className="row center">
                        <div className="row center">
                            {this.state.showStickyHeader && (
                                <div className="stickyHeader z-depth-2" style={stickyStyles}>
                                    <span className="center-align headerdr">DR.Number </span>
                                    <span className="center-align headerdr">Area </span>
                                    <span className="center-align headerdr"> Description </span>
                                    <span className="center-align headerdr"> Date.Occurred </span>
                                    <span className="center-align headerdr">Time.Occurred</span>
                                </div>
                            )}
                        <table>
                            <thead>
                            <tr className="grey lighten-2 z-depth-2">
                                <th className="center-align dr">DR Number</th>
                                <th className="center-align areadr">Area</th>
                                <th className="center-align description">Description</th>
                                <th className="center-align dateoccurred">Date Occurred</th>
                                <th className="center-align timeoccurred">Time Occurred</th>
                            </tr>
                            </thead>
                            <tbody>
                                {crimeObj}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
            </Fragment>
        );
    }
}

export default FilterCrimes;


