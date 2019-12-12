import React from 'react';

class Register extends React.Component {
    state = {
        firstNmae: '',
        lastName: '',
        username: '',
        password: ''
    }

    hendlChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({});
    }

    signUp() {
        console.log("ddd")
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password
        }
        console.log(user)
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
                ;
            })
    };

    render() {
        return <div className='col-md-8'>
            <div className='card p-4 bg-light'>
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