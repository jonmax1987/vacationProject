import React from 'react';
import EditComp from './edit';
import io from 'socket.io-client';

const socket = io('/');



class VacationComp extends React.Component {
    state = {
        vacation: [],
        thisVacation: {},
        show_edit: false,
        temp: 'ok'
    }

    componentDidMount() {
        socket.emit('Get_vacation')
        socket.on('Enable_function', () => {
            this.getVacation();
            console.log('got vacation');

        })
    };

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
                if (res.message == "vacation list...") {
                    res.data.map((obj) => {
                        let img = obj.img;
                        obj.img = atob(img)
                    })
                    this.state.vacation = res.data;
                    this.setState({});
                    console.log(this.state.vacation);
                } else {
                    alert(res.message)
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    };

    openEdit(obj) {
        this.state.thisVacation = obj;
        this.state.show_edit = !this.state.show_edit;
        this.setState({});
    }

    deletVacation(obj) {
        fetch('/vacations/vacation', {
            method: "DELETE",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                socket.emit('Get_vacation')

            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    };

    closeEditComp = () => {
        this.state.show_edit = false;
        this.setState({});
        socket.emit('Get_vacation')
    }




    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    {this.state.show_edit ? <EditComp obj={this.state.thisVacation} closeFun={this.closeEditComp.bind(this)} /> : null}
                </div>
            </div>
            <div className='row'>
                {this.state.vacation.map((obj, i) => {
                    return <div className='col-md-3'>
                        <div className="card m-1 " key={i}>
                            <div className="card-body">
                                <button style={{
                                    width: '30px',
                                    height: '30px',
                                    padding: '6px 0px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    lineHeight: '1.42857'
                                }} className="btn btn-light btn-circle btn-circle-sm m-1 " onClick={this.deletVacation.bind(this, obj)}><i className="far fa-times-circle"></i></button>
                                <button style={{
                                    width: '30px',
                                    height: '30px',
                                    padding: '6px 0px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    lineHeight: '1.42857'
                                }} className="btn btn-light btn-circle btn-circle-sm m-1" onClick={this.openEdit.bind(this, obj)}><i className="far fa-edit"></i></button>
                                <h4 className="card-text">Description: <strong>{obj.description}</strong></h4>
                                <p className="card-text">Price: <strong>{obj.price}</strong></p>
                                <img src={obj.img} className="card-img" alt="..." />
                                <h6 className="card-text">Target: {obj.target}</h6>
                                <p className="card-text">Start Date: {obj.start_date}</p>
                                <p className="card-text">End Date: {obj.end_date}</p>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    }
}

export default VacationComp;