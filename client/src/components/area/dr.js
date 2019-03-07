import React, {Component} from 'react';
import axios from "axios";


class DrId extends Component {

    async componentDidMount() {
        const resp = await axios.get('/api' + window.location.pathname);

        this.drNumber = props['DR Number'];
        this.area = props['Area'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        this.areaId = props['Area ID'];
        this.code = props['code'];
        this.timeOccurred = props['Time Occurred'];

        console.log("response:", resp);
    }

    render() {
        return (
            <div className="container col s12">
                <div className="row">
                    <table>
                        <thead>
                        <tr className="grey darken-4 z-depth-2">
                            <th className="center-align">Area</th>
                            <th className="center-align">Area ID</th>
                            <th className="center-align">DR Number</th>
                            <th className="center-align">Date Occurred</th>
                            <th className="center-align">Time Occurred</th>
                            <th className="center-align">Code</th>
                            <th className="center-align">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="center-align">{this.area}</td>
                            <td className="center-align">{this.areaId}</td>
                            <td className="center-align">{this.drNumber}</td>
                            <td className="center-align">{this.dateOccurred}</td>
                            <td className="center-align">{this.timeOccurred}</td>
                            <td className="center-align">{this.code}</td>
                            <td className="center-align">{this.crimeType}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DrId;

