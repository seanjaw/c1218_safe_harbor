import React, {Component} from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import totalcrimes from '../crimes/totalcrimes';



class BarChart extends Component {
    randomizer(){
        let r = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        return `rgb(${r},${g},${b})`
    }
    async componentDidMount(){
        let labels =[];
        let data = []; 
        let colors = []
        const precInfo = await axios.get('/api/precInfo/');
        // console.log(precInfo.data.data)
    for ( let key in precInfo.data.data){
        labels.push(precInfo.data.data[key].name)
        data.push(precInfo.data.data[key].total)
        }
        for ( let i =0 ; i<21 ;i++ ){
            colors.push(this.randomizer())
        }
        // console.log(labels)
        // console.log(data)
        var ctx = document.getElementById('barChart');
        var myChart = new Chart(ctx,{
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Total Crimes',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                    }],
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
                <canvas id='barChart' width="200" height="50"></canvas>
        )
    }
}

export default BarChart;
