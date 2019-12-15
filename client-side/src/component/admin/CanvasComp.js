import React, { Component } from 'react';
import io from 'socket.io-client';
import CanvasJSReact from '../../assets/canvasjs.react';
import { Socket } from 'dgram';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
const socket = io('/');


class CanvasComp extends Component {
  state = {
    vacation: []
  }
  componentDidMount() {
    console.log(this.props.vacation);
    this.option(this.props.vacation)
  }

  option(props) {
    props.map((obj) => {
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