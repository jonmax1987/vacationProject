import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';

class MenuComp extends React.Component {
    state = {
        username: localStorage.getItem('username')
    }

    LogOff() {
        localStorage.clear();
    };

    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-sm m-2 bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="http://t2.gstatic.com/images?q=tbn:ANd9GcT5NhXNmdzSxSAsgfUvrvsw5AdndEv-vWfZuvbiCLdJHRr540O7bX7Bpko" alt="Logo" style={{ width: '50px' }} />
                    </a>
                    <div className='navbar-collapse collapse'>
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className='nav-link' to="/home">Home</Link></li>
                            <li className="nav-item"><Link className='nav-link' to="/">Login</Link></li>
                            <li className="nav-item"><Link className='nav-link' to="/register">Register</Link></li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item"><div className='nav-link'> Welcom:{localStorage.getItem('username')}</div> </li>
                        <li className='nav-item' onClick={this.LogOff.bind()}><Link className='nav-link' to="/">Log Off</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default MenuComp;