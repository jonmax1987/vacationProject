import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditComp from './edit';
import io from 'socket.io-client';
import MenuAdmin from './menu_admin';

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
        let user_local = localStorage.id_user
        console.log(user_local);

        if (user_local == null || user_local == undefined) {
            this.state.show_alert = false;
            this.setState({});
            return;
        }
        this.state.show_alert = true;
        this.setState({});
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
                    console.log(res);
                    this.state.vacation = res.data;
                    this.setState({});
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
        socket.emit('Get_vacation')
    }




    render() {
        return <div className='container'>
            <div className='row'>
                {this.state.vacation.map((obj, i) => {
                    return <div className="card m-1 col-md-3" key={i}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzV4e-pbvbIdIyy0MX3xBx95vgIepWqrwv1pJau5PP_tVRGx_fH08A3ovauw&s" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <span className='card-title btn btn-light' onClick={this.deletVacation.bind(this, obj)}><i className="far fa-times-circle"></i></span>
                            <span className='card-title btn btn-light' onClick={this.openEdit.bind(this, obj)}><i className="far fa-edit"></i></span>
                            <h2 className="card-text">Description: {obj.description}</h2>
                            <h6 className="card-text">Target: {obj.target}</h6>
                            <p className="card-text">Start Date: {obj.start_date}</p>
                            <p className="card-text">End Date: {obj.end_date}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}

export default VacationComp;