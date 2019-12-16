import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;



class CanvasComp extends Component {
  state = {
    vacation:this.props.vacation,
    vacations: []
  }
  componentDidMount() {
    this.option();
  }


  option() {
    this.state.vacation.map((obj) => {
      let datapoint = {
        label: '',
        y: 0
      }
      datapoint.label = obj.description;
      datapoint.y = obj.number_followers;
      this.state.vacations.push(datapoint);
      this.setState({});
      console.log(this.state.vacation);
      
    })
  };

  render() {
    var options = {
      title: {
        text: "Basic Column Chart in React"
      },
      data: [{
        type: "column",
        dataPoints: this.state.vacations
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