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

        console.log("response:", resp);

        this.setState({
            area: resp.data.geoJson.features
        });



    }

    render(){
        const area = this.state.area.slice(0,5).map( areaItem => {
            console.log('what is this',areaItem)
            return <AreaEntry key={areaItem.properties['DRNumber']}{...areaItem.properties}/>
        });
        return (
            <div className="container col s12">
                <div className="row">
                    <table className="col s12">
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">Report #</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
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
