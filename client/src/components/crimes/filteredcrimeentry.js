import React, {Component} from 'react';


class FilteredCrimeEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DRNumber'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        this.area = props['Area'];
        this.areaId = props['Area ID'];
    }

    goToDr = () => {
        window.location='/dr/'+this.drNumber;
    }

    filterCrime = () => {
        window.location='/area/'+this.area+'/crime/'+this.crimeType;
    }

    render() {
        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td onClick={this.filterCrime} className="non center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
            </tr>
        );
    }
}

export default FilteredCrimeEntry;