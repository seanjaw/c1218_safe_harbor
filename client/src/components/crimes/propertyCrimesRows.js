import React, {Component} from 'react';
import axios from "axios";
import PropertyCrimeEntry from "./propertyCrimeEntry";


class PropertyCrimeRows extends Component {
    state = {
        propertyCrime: [],
        showStickyHeader: false
    };
    handleScroll = this.handleScroll.bind(this);

    componentDidMount() {
        this.getPropertyCrimes();
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
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

    async getPropertyCrimes() {
        const resp = await axios.get('/api/crimetype/property');
        this.setState({
            propertyCrime: resp.data.data
        });
    }

    render() {
        const propertyCrime = this.state.propertyCrime.slice(0,100).map( propertyItem => {
            return <PropertyCrimeEntry key={propertyItem['DR Number']}{...propertyItem}/>
        });

        const stickyStyles = {
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        };

        return (
            <div>
                <div className="row center">
                    {this.state.showStickyHeader && (
                        <div className="stickyHeader z-depth-2" style={stickyStyles}>
                            <span className="center-align header"> Report# </span>
                            <span className="center-align header"> Area </span>
                            <span className="center-align header"> Crime </span>
                            <span className="center-align header"> Date </span>
                        </div>
                    )}
                    <table>
                        <thead>
                        <tr className="grey z-depth-2">
                            <th className="center-align">Report#</th>
                            <th className="center-align">Area</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {propertyCrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PropertyCrimeRows;
