import React, {Component} from 'react';
import axios from "axios";
import AreaEntry from './areaEntry';
import {withRouter} from 'react-router-dom';


class AreaAPI extends Component {
    state = {
        area: []
    }

    componentDidMount() {
        this.getArea();
    }

    async getArea() {
        const resp = await axios.get('/api/'+ this.props.location.pathname);
        this.setState({
            area: resp.data.geoJson.features
        });
    }

    render(){
        const area = this.state.area.slice(0,100).map( areaItem => {
            return <AreaEntry key={areaItem.properties['DRNumber']}{...areaItem.properties}/>
        });
        return (
            <div>
                <div className="row center">
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">Report #</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
                            <th className="center-align">Time</th>
                        </tr>
                        </thead>
                        <tbody>
                            {area}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(AreaAPI);
