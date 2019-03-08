import React, {Component} from 'react';


class ViolentCrimeEntry extends Component {
    constructor(props) {
        super(props);

        this.drNumber = props['DR Number'];
        this.area = props['Area'];
        this.crimeType = props['description'];
        this.dateOccurred = props['Date Occurred'];
        this.areaId = props['Area ID'];
        this.code = props['code'];
    }


    goToDr = () => {
        window.location='/dr/'+this.drNumber;
        console.log('location:',window.location);
    }

    goToArea = () => {
        window.location='/area/'+this.areaId;
    }

    goToCrime = () => {
        window.location='/crimes/'+this.code;
    }


    render() {

        return (
            <tr>
                <td onClick={this.goToDr} className="center-align">{this.drNumber}</td>
                <td onClick={this.goToArea} className="center-align">{this.area}</td>
                <td onClick={this.goToCrime} className="center-align">{this.crimeType}</td>
                <td className="non center-align">{this.dateOccurred}</td>
            </tr>
        );
    }
}

export default ViolentCrimeEntry;