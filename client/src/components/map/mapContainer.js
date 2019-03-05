import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import GeneralMap from './generalMap.js';


class MapContainer extends Component {
    componentDidMount(){
        this.setState({
            path: this.props.location.pathname
        })
    }
    render(){
        return(
            //if statement to determine which map to display based off path.
            //componentShouldUpdate if it should re-render based on current path and previous path
            <div>
                <GeneralMap/>
            </div>
        )
    }
}

export default withRouter(MapContainer);
