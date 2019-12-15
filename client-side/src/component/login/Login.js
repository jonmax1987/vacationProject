import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';


class Login extends React.Component {
  state = {
    username: 'Enter  username',
    password: '',
    toHome: false,
    toAdmin: false
  }

  componentDidMount() {
  }

  hendlChange(e) {
    this.state[e.target.name] = e.target.value;
    this.setState({});
  };

  submit = () => {
    let obj = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('/users/user', {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data != null) {
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('id_user', res.data.id_user)
          if (res.data.role == 1) {
            this.setState({
              toHome: true
            });
          }
          if (res.data.role == 0) {
            this.setState({
              toAdmin: true
            })
          }
        } else {
          alert(res.message);
        }
      })
  };

  render() {
    if (this.state.toAdmin == true){ 
      return <Redirect to='/admin' />
    }
    if (this.state.toHome == true) {
      return <Redirect to='/home' />
    }
    return <div className='col-md-8'>
      <div className='card p-3 bg-light'>
        <form className='form'>
          <h1 className="">Please sign in</h1>
          <div className='form-group'>
            <label>Name</label>
            <input type='text' className='form-control' name='username' placeholder='Enter  username...' onChange={this.hendlChange.bind(this)} />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' name='password' placeholder='Enter password...' onChange={this.hendlChange.bind(this)} />
          </div>
          <div className='d-flex justify-content-center'>
            <div className='btn btn-primary m-1' onClick={this.submit.bind(this)}>Login</div>
            <div className='btn btn-primary m-1'><Link className='text-light' to='/Register'>Register</Link></div>
          </div>
        </form>
      </div>
    </div>
  }
}

export default Login;
