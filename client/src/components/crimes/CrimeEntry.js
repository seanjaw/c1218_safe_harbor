import React, {Component} from 'react';


class CrimeEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DRNumber'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        this.timeOccurred = props['Time Occurred'];
    }

    goToDr = () => {
        window.location='/dr/'+this.drNumber;
    }

    goToArea = () => {
        window.location='/area/'+this.area;
    }

    filterCrime = () => {

    }

    render() {
        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td onClick={this.filterCrime} className="non center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
                <td className="non center-align">{this.timeOccurred}</td>
            </tr>
        );
    }
}

export default CrimeEntry;