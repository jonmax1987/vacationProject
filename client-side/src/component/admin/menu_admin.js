import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';

class MenuAdmin extends React.Component {

    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-sm m-2 bg-light">
                    <div className='navbar-collapse collapse'>
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link to='/addvacation' className='nav-link'>Add Vacation</Link></li>
                            <li className="nav-item"><Link className='nav-link' to="/graph">Graph</Link></li>
                            <li className="nav-item"><Link className='nav-link' to="/admin">Vacation</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default MenuAdmin;