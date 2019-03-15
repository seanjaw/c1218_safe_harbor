import React, {Component} from 'react';
import axios from "axios";
import ViolentCrimeEntry from './violentCrimeEntry';


class ViolentCrimeRows extends Component {
    state = {
        violentCrime: [],
        showStickyHeader: false
    };
    handleScroll = this.handleScroll.bind(this);

    componentDidMount() {
        this.getViolentCrimes();
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

    async getViolentCrimes() {
        const resp = await axios.get('/api/crimetype/violent');
        this.setState({
            violentCrime: resp.data.data
        });
    }

    render() {
        const violentCrime = this.state.violentCrime.slice(0,100).map( violentItem => {
            return <ViolentCrimeEntry key={violentItem['DR Number']}{...violentItem}/>
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
                            <span className="center-align header"> DRNumber </span>
                            <span className="center-align header"> Area </span>
                            <span className="center-align header"> Crime </span>
                            <span className="center-align header"> Date </span>
                        </div>
                    )}
                    <table>
                        <thead>
                        <tr className="z-depth-2">
                            <th className="center-align"> DR Number</th>
                            <th className="center-align">Area</th>
                            <th className="center-align">Crime</th>
                            <th className="center-align">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                          {violentCrime}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ViolentCrimeRows;
