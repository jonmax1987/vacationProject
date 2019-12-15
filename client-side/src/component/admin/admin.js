import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from 'socket.io-client';
import MenuAdmin from './menu_admin';
import AddVacationComp from './add_vacation';
import VacationComp from './vacation';
import CanvasComp from './CanvasComp';

const socket = io('/');

class AdminComp extends React.Component {
    state = {
        vacation: [],
    }

    componentDidMount() {
        socket.emit('Get_vacation')
        socket.on('Enable_function',()=>{
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

    render() {
        return <div className='container'>
     <Router>
                <div className='row'>
                    <div className='col md-12'>
                        <MenuAdmin></MenuAdmin>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col'>
                        <Route exact path="/" component={VacationComp} />
                        <Route path="/addvacation" component={AddVacationComp} />
                        <Route path="/graph" component={() => <CanvasComp vacation={this.state.vacation} />} />
                    </div>
                </div>
            </Router>
        </div>
    
    }
}

export default AdminComp;