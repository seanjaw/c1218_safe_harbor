import React, {Component,Fragment} from 'react';
import Axios from 'axios';
import { totalmem } from 'os';

class Total extends Component{
    state={
        violent:null,
        property:null
    }

    async componentDidMount(){
        const totals = await Axios.get('/api/total');
        this.setState({
            violent:totals.data.data[0].ViolentCrimes,
            property:totals.data.data[0].PropertyCrimes,
            total: totals.data.data[0].ViolentCrimes + totals.data.data[0].PropertyCrimes
        })
    }

    render(){
        return(
            <Fragment>
                <tr>
                    <td className="non center-align">Total : {this.state.total} <i className="small material-icons" onClick={()=>{
                        window.location='/stats'}}>insert_chart</i></td>
                </tr>
                <tr>
                    <td className="non center-align">Violent : {this.state.violent}</td>
                </tr>
                <tr>
                    <td className="non center-align">Property : {this.state.property}</td>
                </tr>
            </Fragment>
        );
    }
    
}

export default Total;