import React, {Component} from 'react';


class PCrimeEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DRNumber'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        this.area = props['Area'];
    }

    goToDr = () => {
        window.location='/dr/'+this.drNumber;
    }

    goToArea = () => {
        window.location='/area/'+this.area;
    }

    render() {
        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td className="non center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
            </tr>
        );
    }
}

export default PCrimeEntry;