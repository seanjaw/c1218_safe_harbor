import React, {Component,Fragment} from 'react';
import Axios from 'axios';
import { totalmem } from 'os';


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

    goToViolent = () => {
        window.location='/violent';
    }

    goToProperty = () => {
        window.location='/property';
    }

    goToStats = () => {
        window.location='/stats';
    }

    render(){
        return(
            <div className="accordion-container">
                <ul className="collapsible popout" data-collapsible="accordion">
                    <li>
                        <div onClick={this.goToStats} className="collapsible-header">
                            <i className="material-icons">account_balance</i>
                            Total Crimes: {this.state.total}
                        </div>
                        <div className="collapsible-body"><p>Total Chart</p></div>
                    </li>
                    <li>
                        <div onClick={this.goToViolent} className="collapsible-header"><i className="material-icons">report_problem</i>Violent Crimes: {this.state.violent}</div>
                        <div className="collapsible-body"><p>Violent Chart</p></div>
                    </li>
                    <li>
                        <div onClick={this.goToProperty} className="collapsible-header"><i className="material-icons">store</i>Property Crimes: {this.state.property}</div>
                        <div className="collapsible-body"><p>Property Charge</p></div>
                    </li>
                </ul>
            </div>

        );
    }

}

export default Total;
