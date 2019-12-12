import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class EditComp extends React.Component {

    state = {
        description: this.props.obj.description,
        target: this.props.obj.target,
        img: this.props.obj.img,
        startDate: this.props.obj.start_date,
        endDate: this.props.obj.end_date,
        price: this.props.obj.price
    }

    componentDidMount() {
        console.log(this.props.obj);

    };

    savevacation = () => {
        let obj = {
            description: this.state.description,
            target: this.state.target,
            img: this.state.img,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price,
            id: this.props.obj.id
        }
        fetch('/vacations/vacation', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.props.closeFun();
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    };

    handlChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({});
    };

    render() {
        return <div className='col md-12'>
            <div className='form-group'>
                <input className='form-control' name='description' value={this.state.description} onChange={this.handlChange.bind(this)} placeholder='Description...' />
            </div>
            <div className='form-group'>
                <input className='form-control' name='target' value={this.state.target} onChange={this.handlChange.bind(this)} placeholder='Target...' />
            </div>
            <div className='form-group'>
                <input className='form-control' name='startDate' value={this.state.startDate} onChange={this.handlChange.bind(this)} placeholder='Start Date...' />
            </div>
            <div className='form-group'>
                <input className='form-control' name='endtDate' value={this.state.endDate} onChange={this.handlChange.bind(this)} placeholder='End Date...' />
            </div>
            <div className='form-group'>
                <input className='form-control' name='price' value={this.state.price} onChange={this.handlChange.bind(this)} placeholder='Price...' />
            </div>
            <div className='form-group'>
                <input className='form-control' name='img' value={this.state.img} onChange={this.handlChange.bind(this)} placeholder='img...' />
            </div>
            <div className='btn btn-info' onClick={this.savevacation.bind(this)}>save</div>
        </div>

    }
}

export default EditComp;