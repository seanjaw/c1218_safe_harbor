import React, {Component} from 'react';


class AreaEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DRNumber'];
        this.crimeType = props['description'];
        this.code = props['Crime Code'];
        this.dateOccurred = props['Date Occurred'];
        this.areaId = props['Area ID'];
        this.timeOccurred = props['Time Occurred'];
    }

    goToDr = () => {
        window.location='/dr/'+this.drNumber;
    }

    filterCrime = () => {
       window.location='/filtered-crimes/'+this.areaId+'/'+this.code;
}

    render() {
        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td onClick={this.filterCrime} className="center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
                <td className="non center-align">{this.timeOccurred}</td>

            </tr>
        );
    }
}

export default AreaEntry;