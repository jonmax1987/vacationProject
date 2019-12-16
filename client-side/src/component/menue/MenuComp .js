import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from 'socket.io-client';

const socket = io('/');


class MenuComp extends React.Component {
    state = {
        username: localStorage.getItem('username') ? localStorage.getItem('username') : 'geust'
    }

    componentDidMount() {
        socket.on('Enable_function', () => {
            if (localStorage.getItem('username')) {
                this.state.username = localStorage.getItem('username')
                this.setState({});
                console.log("local true");

            } else {
                this.state.username = 'geust'
                console.log("local false");
                this.setState({});
            }
        })
    }

    LogOff() {
        localStorage.clear();
        this.state.username = 'geust'
        this.setState({});
        console.log("local false");
    };

    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-sm m-2 bg-light">
                    <div className="navbar-brand" >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeblPv6g1X4jUpqcRDV5CTvC7GjaZX6PGPiBT-mS-GoypomUPKZrliDP0hA&s" alt="Logo" style={{ width: '50px' }} />
                    </div>
                    <div className='navbar-collapse collapse'>
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className='nav-link' to="/home">Home</Link></li>
                            <li className="nav-item"><Link className='nav-link' to="/">Login</Link></li>
                            <li className="nav-item"><Link className='nav-link' to="/register">Register</Link></li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item"><div className='nav-link'> Welcome:{this.state.username}</div> </li>
                        <li className='nav-item' onClick={this.LogOff.bind(this)}><Link className='nav-link' to="/">LogOut</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default MenuComp;