import React, {Component} from 'react';
import axios from "axios";
import AreaEntry from './areaEntry';
import {Link, withRouter} from 'react-router-dom';


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
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs z-depth-2 valign-wrapper">
                            <li className="active tab col s4">
                                <Link to="/">Total</Link>
                            </li>
                            <li className="tab col s4">
                                <Link to="/violent">Violent</Link>
                            </li>
                            <li className="tab col s4">
                                <Link to="/property">Property</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row center">
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">Report#</th>
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
