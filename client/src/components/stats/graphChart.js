import React, {Component} from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class GraphChart extends Component {
    randomizer(){
        let r = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        return `rbg(${r},${b},${g})`
    }
    async componentDidMount(){
        const stats = await axios.get('/api/stats/linegraph');
        console.log(stats)
        var ctx = document.getElementById('graphChart');
        var myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets:[{
                    label: '2019',
                    data: [12000,15678,13294,9023,13643,10000,15387, 8000, 11000,15678,13294,9023],
                    borderColor: this.randomizer(),
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    lineTension:0
                },
                {
                    label: '2018',
                    data: [12000,15678,13294,9023,13643,10000,15387, 8000, 11000,15678,13294,9023],
                    borderColor: 'rgb(255,99,132)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    lineTension:0
                },
                {
                    label: '2017',
                    data: [12000,15678,13294,9023,13643,10000,15387, 8000, 11000,15678,13294,9023],
                    borderColor: 'rgb(255,99,132)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    lineTension:0
                },
                {
                    label: '2016',
                    data: [12000,15678,13294,9023,13643,10000,15387, 8000, 11000,15678,13294,9023],
                    borderColor: 'rgb(255,99,132)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 3,
                    lineTension:0
                }
            ]
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
