import React, {Component} from 'react';
import axios from "axios";
import AreaEntry from './areaEntry';
import {Link, withRouter} from 'react-router-dom';


class AreaAPI extends Component {
    constructor(props){
        super(props);
        this.areaLength = this.state.area.length
        window.onscroll = () => {
            if(
                (window.innerHeight + window.pageYOffset)
                >= document.body.scrollHeight*(4/6)
            ){
                if(this.areaLength===this.state.area.length){
                    return;
                }else{
                    this.areaLength = this.state.area.length
                    this.getArea();
                }
                
            }
        }
    }
    state = {
        area: [],
        showStickyHeader: false
    };
    

    componentDidMount() {
        this.getArea();
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll=()=>{
        const thead = document.getElementsByTagName('thead')[0];
        const bounds = thead.getBoundingClientRect();
        if (!this.state.showStickyHeader && bounds.top < 0){
            this.setState({
                showStickyHeader: true
            })
        } else if (this.state.showStickyHeader && bounds.top > 0){
            this.setState({
                showStickyHeader: false
            })
        }
    }

    async getArea() {
        let areaLength = this.state.area.length
        const resp = await axios.get('/api/'+ this.props.location.pathname + '/' + areaLength);
        this.setState({
            area: [...this.state.area,...resp.data.geoJson.features]
        });
    }

    render(){
        const area = this.state.area.map( areaItem => {
            return <AreaEntry key={areaItem.properties['DRNumber']}{...areaItem.properties}/>
        });

        const stickyStyles = {
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        };

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
                    {this.state.showStickyHeader && (
                        <div className="stickyHeader z-depth-2" style={stickyStyles}>
                            <span className="center-align header"> DRNumber </span>
                            <span className="center-align header"> Area </span>
                            <span className="center-align header"> Crime </span>
                            <span className="center-align header"> Date </span>
                        </div>
                    )}
                    <table>
                        <thead>
                        <tr className="grey lighten-2 z-depth-2">
                            <th className="center-align">DR Number</th>
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
