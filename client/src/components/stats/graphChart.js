import React, {Component} from 'react';
import Chart from 'chart.js';
import axios from 'axios';

class GraphChart extends Component {
    randomizer(){
        let r = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        return `rgb(${r},${g},${b})`
    }
    async componentDidMount(){
        let holder= [];

        for (let i= 2017; i<=2018; i++){
            let totalCrimes= {
                label: '' +i ,
                data: [],
                borderColor: this.randomizer(),
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 3,
                lineTension:0
            }
            const stats = await axios.get('/api/stats/linegraph/' + i);
            for (let i =0; i< stats.data.length; i++){
                totalCrimes.data.push(stats.data[i].total)
            }
            holder.push(totalCrimes)
           
        }

        var ctx = document.getElementById('graphChart');
        var myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets:holder
            },
            options: {
                devicePixelRatio:1.5,
                responsive:true,
                maintainAspectRatio:false,
                legend:{
                    labels:{
                        fontColor:'white'
                    }
                },
                title:{
                    display:true,
                    text:"Year by Year Comparison of Crime",
                    fontSize:18,
                    fontColor:'white'
                },
                scales: {
                    xAxes:[{
                        gridLines:{
                            color:"#80929190"
                        },
                        ticks:{
                            fontColor:'white'
                        }
                    }],
                    yAxes: [{
                        gridLines:{
                            color:'#80929190'
                        },
                        ticks: {
                            beginAtZero:false,
                            fontColor:'white'
                        }
                    }]
                }
            }
        })
    }



    render(){   
        return(
                <canvas id='graphChart' height='180'></canvas> 
        )
    }
}

export default GraphChart;
