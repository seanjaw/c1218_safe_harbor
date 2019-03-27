import React, {Component} from 'react';
import axios from "axios";
import PropertyCrimeEntry from "./propertyCrimeEntry";


class PropertyCrimeRows extends Component {
    constructor(props){
        super(props);
        this.oldPropCrimeLength = this.state.propertyCrime.length
        window.onscroll = () => {
            // console.log(document.documentElement.scrollTop)
            // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            //     document.getElementById("scrollButton").style.display = "block";
            // } else {
            //     document.getElementById("scrollButton").style.display = "none";
            // }
            if(
                (window.innerHeight + window.pageYOffset)
                >= document.body.scrollHeight*(4/6)
            ){
                if(this.oldPropCrimeLength===this.state.propertyCrime.length){
                    return;
                }else{
                    this.oldPropCrimeLength = this.state.propertyCrime.length
                    this.getPropertyCrimes();
                }
                
            }
        }

    }
    state = {
        propertyCrime: [],
        showStickyHeader: false,
    };

    componentDidMount() {
        this.getPropertyCrimes();
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
    //send the count of the property crime array length as the offset number in the params object
    //figure out why params isn't sending to get call
    getPropertyCrimes= async()=> {
        let crimeCount = this.state.propertyCrime.length
        const resp = await axios.get(`/api/crimetype/property/${crimeCount}`);
        this.setState({
            propertyCrime: [...this.state.propertyCrime,...resp.data.data]
        });
    }

    render() {
        const propertyCrime = this.state.propertyCrime.map( propertyItem => {
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
                            <span className="center-align header"> DRNumber</span>
                            <span className="center-align header">Area </span>
                            <span className="center-align header"> Crime </span>
                            <span className="center-align header"> Date </span>
                        </div>
                    )}
                    <table>
                        <thead>
                        <tr className="grey z-depth-2">
                            <th className="center-align">DR Number</th>
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
