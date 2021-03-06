import React from 'react';

class EditComp extends React.Component {

    state = {
        description: this.props.obj.description,
        target: this.props.obj.target,
        img: this.props.obj.img,
        startDate: this.props.obj.start_date,
        endDate: this.props.obj.end_date,
        price: this.props.obj.price,
        img_64: ''
    }

    componentDidMount() {
        console.log(this.props.obj);

    };

    savevacation = () => {
        this.decode();
        let obj = {
            description: this.state.description,
            target: this.state.target,
            img: this.state.img_64,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price,
            id: this.props.obj.id
        }
        fetch('/vacations/Update', {
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

        if (e.target.name == 'img') {
            this.state.img_64 = btoa(e.target.value);
            this.setState({});
            console.log(this.state.img_64);
        }
    };

    decode(){
        this.state.img_64 = btoa(this.state.img);
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
                <input className='form-control' name='endDate' value={this.state.endDate} onChange={this.handlChange.bind(this)} placeholder='End Date...' />
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
