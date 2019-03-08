import React, {Fragment} from 'react';

export default (props) => {
    return(
        <Fragment>
            <tr>
                <td className="non center-align">Total : 100,000 <i className="small material-icons" onClick={()=>{
                    window.location='/stats'}}>insert_chart</i></td>
            </tr>
            <tr>
                <td className="non center-align">Violent : 400,000</td>
            </tr>
            <tr>
                <td className="non center-align">Property : 100,000</td>
            </tr>
        </Fragment>
    );
}
