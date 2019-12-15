import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './component/login/Login';
import Register from './component/register/Register';
import MenuComp from './component/menue/MenuComp ';
import HomeComp from './component/home/home';
import Compjs from './component/comp';

import AdminComp from './component/admin/admin';


class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return <div>
      <Router>
        <div className='row'>
          <div className='col md-12'>
            <MenuComp />
          </div>
        </div>
          <div className='row d-flex justify-content-center'>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={HomeComp} />
            <Route path="/admin" component={AdminComp} />
            <Route path="/compjs" component={Compjs} />
          </div>
      </Router>
    </div>
  }
}

export default App;
