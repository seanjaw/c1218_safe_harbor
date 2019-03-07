import React, {Component} from 'react';
import Chart from 'chart.js';

class GraphChart extends Component {
    async componentDidMount(){
        var ctx = document.getElementById('graphChart');
        var myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets:[{
                    label: 'Crimes by Year',
                    data: [12000,15678,13294,9023,13643,10000,15387, 8000, 11000,15678,13294,9023],
                    borderColor: 'rgb(255,99,132)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    lineTension:0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    }



    render(){   
        return(
                <canvas id='graphChart' width="200" height="50"></canvas>
        )
    }
}

export default GraphChart;
