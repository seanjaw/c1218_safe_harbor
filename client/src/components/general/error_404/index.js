import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import image404 from './404.gif';
import './style.scss';

class Error404 extends Component {

    render(){
        return (
            <div className='error-container'>
                <img src={image404} alt="" className='error-gif'/>
                <Link to='/'>
                    <i className='material-icons'>home</i>
                </Link>
            </div>
        )
    }
}

export default withRouter(Error404);