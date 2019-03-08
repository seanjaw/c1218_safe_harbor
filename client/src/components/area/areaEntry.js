import React, {Component} from 'react';


class AreaEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DRNumber'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        // this.areaId = props['Area ID'];
        // this.code = props['code'];
    }


    goToDr = () => {
        window.location='/dr/'+this.drNumber;
        console.log('location:',window.location);
    }
    //
    // goToArea = () => {
    //     window.location='/area/'+this.areaId;
    // }
    //
    // goToCrime = () => {
    //     window.location='/crime/'+this.code;
    // }


    render() {
        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td onClick={this.goToCrime} className="center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
            </tr>
        );
    }
}

export default AreaEntry;