import React from 'react';
import Warning from '../../moduls/warning';

class Register extends React.Component {
    state = {
        firstNmae: '',
        lastName: '',
        username: '',
        password: '',
        show_message: false,
        message: "",
        tipeClass: false
    }

    hendlChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({});
    }

    signUp() {
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password
        }
        fetch('/users/user', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.message == "user already exist!!!") {
                    this.state.show_message = true;
                    this.state.message = res.message;
                    this.state.tipeClass = false;
                    this.setState({});
                    console.log("exist");
                } if (res.message == "user added!!!") {
                    this.state.show_message = true;
                    this.state.message = res.message;
                    this.state.tipeClass = true;
                    this.setState({});
                    console.log("not exist");
                }
            })
    };

    render() {
        return <div className='col-md-8'>
            <div className='card p-4 bg-light'>
                {this.state.show_message ? <Warning class={this.state.tipeClass} message={this.state.message} /> : null}
                <h4 className='text-center'>Register</h4>
                <form className='form'>
                    <div className='form-group'>
                        <input className='form-control' type='text' name='firstName' onChange={this.hendlChange.bind(this)} placeholder='Enter first Name...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' type='text' name='lastName' onChange={this.hendlChange.bind(this)} placeholder='Enter last Name...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' type='text' name='username' onChange={this.hendlChange.bind(this)} placeholder='Enter Username...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' type='password' name='password' onChange={this.hendlChange.bind(this)} placeholder='Enter Password...' />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="button" className="btn btn-outline-primary" onClick={this.signUp.bind(this)}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    }
}
export default Register;