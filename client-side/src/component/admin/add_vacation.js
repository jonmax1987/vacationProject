import React from 'react';
import MenuAdmin from './menu_admin';


class AddVacationComp extends React.Component {

    state = {
        description: '',
        target: '',
        img: '',
        startDate: '',
        endDate: '',
        price: '',
        NumberFollowers: '',
        img_64: '',
        obj: {}
    }

    componentDidMount() {

    };

    savevacation = () => {
        var obj = {
            description: this.state.description,
            target: this.state.target,
            img: this.state.img_64,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price
        }
        console.log(obj);

        fetch('/vacations/vacation', {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.setState({ vacation: res.data });
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    };

    handlChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name);

        if (e.target.name == 'img') {
            this.state.img_64 = btoa(e.target.value);
            this.setState({});
            console.log(this.state.img_64);
        }
    };

    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col'>
                    <MenuAdmin></MenuAdmin>
                </div>
            </div>
            <div className='row'>
                <div className='col md-12'>
                    <div className='form-group'>
                        <input className='form-control' name='description' onChange={this.handlChange.bind(this)} placeholder='Description...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' name='target' onChange={this.handlChange.bind(this)} placeholder='Target...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' name='startDate' onChange={this.handlChange.bind(this)} placeholder='Start Date...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' name='endDate' onChange={this.handlChange.bind(this)} placeholder='End Date...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' name='price' onChange={this.handlChange.bind(this)} placeholder='Price...' />
                    </div>
                    <div className='form-group'>
                        <input className='form-control' name='img' onChange={this.handlChange.bind(this)} placeholder='img...' />
                    </div>
                    <div className='btn btn-info' onClick={this.savevacation.bind()}>add vacation</div>
                </div>
            </div>
        </div>

    }
}

export default AddVacationComp;