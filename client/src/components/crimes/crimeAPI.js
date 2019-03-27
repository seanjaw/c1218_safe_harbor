import React, {Component} from 'react';
import axios from "axios";
import CrimeEntry from './CrimeEntry';
import {Link, withRouter} from 'react-router-dom';


class CrimeAPI extends Component {
    constructor(props){
        super(props);
        this.crimeLength = this.state.crime.length
        window.onscroll = () => {
            if(
                (window.innerHeight + window.pageYOffset)
                >= document.body.scrollHeight*(4/6)
            ){
                if(this.crimeLength===this.state.crime.length){
                    return;
                }else{
                    this.crimeLength = this.state.crime.length
                    this.getCrime();
                }
                
            }
        }
    }

    state = {
        crime:[],
        showStickyHeader: false
    };

    componentDidMount() {
        this.getCrime();
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

    async getCrime() {
        const resp = await axios.get('/api'+ this.props.location.pathname+'/'+this.state.crime.length);
        this.setState({
            crime: [...this.state.crime,...resp.data.geoJson.features]
        });
    }

    render(){
        const crime = this.state.crime.map( crimeItem => {
            return <CrimeEntry key={crimeItem.properties['DRNumber']}{...crimeItem.properties}/>
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
                <div>
                    <div className="row center">
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
                                    <th className="center-align report">DR Number</th>
                                    <th className="center-align crime">Crime</th>
                                    <th className="center-align date">Date</th>
                                    <th className="center-align time">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                               {crime}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(CrimeAPI);
