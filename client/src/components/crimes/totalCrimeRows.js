import React, {Component,Fragment} from 'react';
import Axios from 'axios';
import { totalmem } from 'os';
import {Link} from 'react-router-dom';

class Total extends Component{
    state={
        violent:null,
        property:null
    }

    componentDidMount() {
        this.getTotals();
    }

    async getTotals(){
        const totals = await Axios.get('/api/total');
        this.setState({
            violent:totals.data.data[0].ViolentCrimes,
            property:totals.data.data[0].PropertyCrimes,
            total: totals.data.data[0].ViolentCrimes + totals.data.data[0].PropertyCrimes
        })
    }

    goToStats = () => {
        window.location='/stats';
    }

    render(){
        return(
            <div className="accordion-container">
                <ul className="collapsible popout collapsible-accordian" data-collapsible="accordion">
                    <li>
                        <div className="collapsible-header">
                            <i className="material-icons">account_balance</i>
                            Total Crimes: {this.state.total}
                        </div>
                        <div className="collapsible-body"><p>Total Chart</p></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">report_problem</i>Violent Crimes: {this.state.violent}</div>
                        <div className="collapsible-body pulse"><p>Violent Chart</p></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">store</i>Property Crimes: {this.state.property}</div>
                        <div className="collapsible-body"><p>Property Charge</p></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><i onClick={this.goToStats} id="stats" className="material-icons">poll</i>Detailed Stats</div>
                    </li>
                </ul>
            </div>

        );
    }

}

export default Total;

{/*<tr>*/}
    {/*<td className="non center-align">Total : {this.state.total} <i className="small material-icons" onClick={()=>{*/}
        {/*window.location='/stats'}}>insert_chart</i></td>*/}
{/*</tr>*/}
{/*<tr>*/}
{/*<td className="non center-align">Violent : {this.state.violent}</td>*/}
{/*</tr>*/}
{/*<tr>*/}
    {/*<td className="non center-align">Property : {this.state.property}</td>*/}
{/*</tr>*/}