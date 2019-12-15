import React, { Component } from 'react';
import io from 'socket.io-client';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
const socket = io('/');


class CanvasComp extends Component {
  state = {
    vacation: []
  }
  componentDidMount() {
    socket.on('Enable_function', () => {
      this.getVacation();
      console.log('got vacation');
  })
  }

  getVacation = () => {
    let user_local = localStorage.id_user

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
                this.state.vacation = res.data;
                this.setState({});
                console.log('for graph:', this.state.vacation);
                this.option(this.state.vacation)
            } else {
                alert(res.message)
            }
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
};

  option(object) {
    object.map((obj) => {
      let datapoint = {
        label: '',
        y: 0
      }
      datapoint.label = obj.description;
      datapoint.y = obj.number_followers;
      this.state.vacation.push(datapoint);
      this.setState({});
    })
  };

  render() {
    var options = {
      title: {
        text: "Basic Column Chart in React"
      },
      data: [{
        type: "column",
        dataPoints: this.state.vacation
      }]
    }

    return (
      <div>
        <CanvasJSChart options={options}
        /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}
export default CanvasComp;