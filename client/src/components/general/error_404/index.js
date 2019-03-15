import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import image404 from './404.gif';
import './style.scss';

class Error404 extends Component {

    componentDidMount() {
        document.getElementById('goHome404').addEventListener('touchstart', this.iconOnHoverColor);
        document.getElementById('goHome404').addEventListener('touchend', this.iconOffHoverColor);
    }

    iconOnHoverColor() {
        this.setAttribute('style', 'color: #910c08')
    }

    iconOffHoverColor() {
        this.setAttribute('style', '')
    }

    render(){
        return (
            <div className='error-container'>
                <img src={image404} alt="" className='error-gif'/>
                <Link to='/'>
                    <i className='material-icons' id='goHome404'>home</i>
                </Link>
            </div>
        )
    }
}

export default withRouter(Error404);