import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'chart.js'

class PieChart extends Component {
    randomizer(){
        let r = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        return `rgb(${r},${g},${b})`
    }
    async componentDidMount() {
        const totals = await axios.get('/api/total');
        let violent = totals.data.data[0].ViolentCrimes;
        let property =  totals.data.data[0].PropertyCrimes;
        let total = violent+property;
        const violentBreakdown = await axios.get('/api/stats/stackedchart/violent');
        const propertyBreakdown = await axios.get('/api/stats/stackedchart/property');
        let randomColor = this.randomizer();
        let randomColor2 = this.randomizer();
        let data = [
            ...propertyBreakdown.data,
            {
                label: 'Property',
                stack: 'Stack 2',
                data: ['',(property/total)*100,],
                backgroundColor: [randomColor,
                    randomColor,
                ],
                borderColor: [randomColor
                    ,randomColor,
                ],
                borderWidth: 1
            },
            {
                label: 'Violent',
                stack: 'Stack 2',
                data: ['',(violent/total)*100,],
                backgroundColor: [randomColor2
                    ,randomColor2,
                ],
                borderColor: [randomColor2
                    ,randomColor2,
                ],
                borderWidth: 1
            },
            ...violentBreakdown.data
        ];
        var ctx = document.getElementById('pieChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Property", "Total", "Violent"],
                datasets: data
            },
            options: {
                title:{
                    display:true,
                    text:"Crime Breakdown By Property, Total, and Violent",
                    fontSize: 18
                },
                scales:{
                    xAxes:[{
                        barPercentage:.6,
                        stacked:true
                    }],
                    yAxes: [{
                        ticks:{
                            steps:1,
                            stepValue:1,
                            max:100
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
                <canvas id='pieChart' height='180'></canvas>
        )
    }
}

export default PieChart;
