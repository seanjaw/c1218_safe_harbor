import React, {Component} from 'react';
import axios from "axios";


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


    render() {
        const crimeObj = this.state.crimeObj;
        this.drNumber = crimeObj['DRNumber'];
        this.area = crimeObj['Area Name'];
        this.crimeType = crimeObj['description'];
        this.dateOccurred = crimeObj['Date Occurred'];
        this.areaId = crimeObj['Area ID'];
        this.code = crimeObj['code'];
        this.timeOccurred = crimeObj['Time Occurred'];

        return (
            <div>
                <div className="row center">
                    <table>
                        <thead>
                            <tr className="grey lighten-2 z-depth-2">
                                <th className="center-align">DR Number</th>
                                <th className="center-align">Area</th>
                                <th className="center-align">Area ID</th>
                                <th className="center-align">Description</th>
                                <th className="center-align">Date Occurred</th>
                                <th className="center-align">Time Occurred</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="non center-align">{this.drNumber}</td>
                                <td onClick={this.goToArea} className="center-align">{this.area}</td>
                                <td onClick={this.goToArea} className="center-align">{this.areaId}</td>
                                <td className="non center-align">{this.crimeType}</td>
                                <td className="non center-align">{this.dateOccurred}</td>
                                <td className="non center-align">{this.timeOccurred}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DrId;


