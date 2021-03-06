import React from 'react';
import io from 'socket.io-client';

const socket = io('/');

class HomeComp extends React.Component {

    state = {
        img_64: '',
        vacation: [],
        number_followers: 0,
        folow_like: true,
        show_alert: true,
    }

    componentDidMount() {
        socket.emit('Get_vacation')
        socket.on('Enable_function', () => {
            this.getVacation();
            console.log('got vacation');
        })
        this.myFunc();
    }

    async wait(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms)
        });
    }

    getVacation = () => {
        let user_local = localStorage.getItem('id_user')
        if (user_local == null || user_local == undefined) {
            alert("you are not login!!!")
            return;
        }
        let user_id = {
            id: localStorage.getItem('id_user')
        };
        fetch('/vacations/vacation', {
            method: "POST",
            body: JSON.stringify(user_id),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({ vacation: [] });
                if (res.message == "vacation list...") {
                    res.data.map((obj) => {
                        this.state.img_64 = atob(obj.img)
                        this.setState({});
                        obj.img = this.state.img_64;
                    })
                    // await this.wait(3 * 1000);
                    console.log(res.data);
                    this.state.vacation = res.data;
                    this.setState({});
                } else {
                    alert(res.message)
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }



    folowVacation = (obj) => {
        let folow = {
            id_user: localStorage.getItem('id_user'),
            id_vacation: obj.id
        }
        fetch('/vacations/folow', {
            method: "PUT",
            body: JSON.stringify(folow),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                if (res.data == 0) {
                    this.state.folow_like = false;
                    this.setState({});
                    console.log(res.message);
                    socket.emit('Get_vacation');
                } else {
                    this.state.folow_like = true;
                    this.setState({});
                    console.log(res.message, true);
                    socket.emit('Get_vacation');
                }

            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }


    myFunc() {
        const str = 'decode';
        const base64 = btoa(str);
        const decoded = atob(base64);
    };

    render() {
        return <div className='container'>
            <div className='row'>
                {this.state.vacation.map((obj, i) => {
                    return <div className='col-md-4' key={i}>
                        <div className="card" key={i}>
                            <div className="card-body">
                                <button style={{
                                    width: '30px',
                                    height: '30px',
                                    padding: '6px 0px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    lineHeight: '1.42857'
                                }} className="btn btn-light btn-circle btn-circle-sm m-1" onClick={this.folowVacation.bind(this, obj)}>{obj.like_ ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}</button>
                                <h4 className="card-text">Description: <strong>{obj.description}</strong></h4>
                                <p className="card-text">Price: <strong>{obj.price}</strong></p>
                                <img src={obj.img} className="card-img-top" alt="..." />
                                <h6 className="card-text">Target: {obj.target}</h6>
                                <p className="card-text">Start Date: {obj.start_date}</p>
                                <p className="card-text">End Date: {obj.end_date}</p>
                                <button style={{
                                    width: '30px',
                                    height: '30px',
                                    padding: '6px 0px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    lineHeight: '1.42857'
                                }} className="card-text">{obj.number_followers}</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div >
    }
}

export default HomeComp;