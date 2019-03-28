import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import MapContainer from "../map/mapContainer";

class DrId extends Component {
    state={
        crimeObj : []
    }

    async componentDidMount() {
        const resp = await axios.get('/api' + window.location.pathname);
        this.setState({
            crimeObj: resp.data.geoJson.features[0].properties
        });
    }

    goToArea = () => {
        window.location='/area/'+this.areaId;
    }

    goToCrime = () => {
        window.location='/crimes/'+this.code;
    }

    render() {
        const crimeObj = this.state.crimeObj;
        this.drNumber = crimeObj['DRNumber'];
        this.area = crimeObj['Area Name'];
        this.crimeType = crimeObj['description'];
        this.dateOccurred = crimeObj['Date Occurred'];
        this.areaId = crimeObj['Area ID'];
        this.code = crimeObj['Crime Code'];
        this.timeOccurred = crimeObj['Time Occurred'];


        return (
            <div>
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
                <div className="row center">
                    <table>
                        <thead>
                            <tr className="headerdr grey lighten-2 z-depth-2">
                                <th className="center-align dr">DR Number</th>
                                <th className="center-align areadr">Area</th>
                                <th className="center-align areaid">Area ID</th>
                                <th className="center-align description">Description</th>
                                <th className="center-align dateoccurred">Date Occurred</th>
                                <th className="center-align timeoccurred">Time Occurred</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="non center-align">{this.drNumber}</td>
                                <td onClick={this.goToArea} className="center-align">{this.area}</td>
                                <td onClick={this.goToArea} className="center-align">{this.areaId}</td>
                                <td onClick={this.goToCrime} className="center-align">{this.crimeType}</td>
                                <td className="non center-align">{this.dateOccurred}</td>
                                <td className="non center-align">{this.timeOccurred}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}

export default DrId;


