import React, {Component} from 'react';


class FilterCrimeEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DRNumber'];
        this.area = props['Area Name'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        this.timeOccurred = props['Time Occurred'];
        this.code = props['code'];
    }

    goToDr = () => {
        window.location='/dr/'+this.drNumber;
    }

    render() {
        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td onClick={this.goToArea} className="center-align">{this.area}</td>
                <td className="non center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
                <td className="non center-align">{this.timeOccurred}</td>
            </tr>
        );
    }
}

export default FilterCrimeEntry;