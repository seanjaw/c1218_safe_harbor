import React, {Component} from 'react';
import './style.css';
import logo from './logo-w.png';

class AppHeader extends Component {
    componentDidMount() {
        let target = document.getElementById('logo');
        target.setAttribute("style", "background-image: url(" + logo + ");background-repeat: no-repeat;background-size: contain");
    }

    render(){
        return(
            <div className='headerLogo' id='logo'></div>
        )
    }
}

export default AppHeader;