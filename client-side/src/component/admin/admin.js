import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from 'socket.io-client';
import MenuAdmin from './menu_admin';
import AddVacationComp from './add_vacation';
import VacationComp from './vacation';
import CanvasComp from './CanvasComp';
import EditComp from './edit';

const socket = io('/');

class AdminComp extends React.Component {
    state = {
        vacation: [],
        vacation_show:true
    }

    componentDidMount() {
        socket.emit('Get_vacation')
        socket.on('Enable_function',()=>{
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
            id: user_local
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
                        <VacationComp/>
                        {/* <Route exact path='/vacation' component={VacationComp} /> */}
                        <Route path="/addvacation" component={AddVacationComp} />
                        <Route path="/graph" component={() => <CanvasComp vacation={this.state.vacation} />} />
                        <Route path="/edit" component={EditComp} />
                    </div>
                </div>
            </Router>
        </div>
    
    }
}

export default AdminComp;