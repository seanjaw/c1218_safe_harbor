import React, {Component} from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class BarChart extends Component {
    randomizer(){
        let r = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        return `rgba(${r},${g},${b},0.9)`
    }
    async componentDidMount(){
        let labels =[];
        const precInfo = await axios.get('/api/precInfo/');
        let areaInfo = precInfo.data.data
        for ( let key in precInfo.data.data){
            labels.push(precInfo.data.data[key].name)
        }
        let data = areaInfo.map((item,index)=>{
            let randomColor = this.randomizer();
            item.label=item.name;
            delete item.name;
            if(!index){
                item.data=[item.total];
                delete item.total;
                item.backgroundColor=[randomColor];
                item.borderColor=[randomColor];
                return item;
            }
            let fillerKeys = ['data', 'backgroundColor', 'borderColor'];
            let fillers = [item.total, randomColor, randomColor];
            for (let arrayFill = 0; arrayFill < 3; arrayFill++) {
                let arrayFiller = Array(index).fill('');
                arrayFiller.push(fillers[arrayFill]);
                if (fillerKeys[arrayFill] !== 'data') {
                    arrayFiller[0] = randomColor;
                }
                item[fillerKeys[arrayFill]] = arrayFiller;
            }
            delete item.total;
            return item;
        })
        var ctx = document.getElementById('barChart');
        var myChart = new Chart(ctx,{
            type: 'bar',
            data: {
                labels: labels,
                datasets: data
            },
            options: {
                onClick:(event,item)=>{
                    var elementHolder = myChart.getElementAtEvent(event);
                    if(elementHolder.length){
                        this.props.history.push('area/'+ (elementHolder[0]['_index']+1))
                    }
                },
                devicePixelRatio:1.5,
                responsive:true,
                maintainAspectRatio:false,
                legend:{
                    fullWidth:true,
                    labels:{
                        boxWidth:20,
                        fontColor:'white'
                    }
                },
                title:{
                    display:true,
                    text:"Crime Breakdown By Area",
                    fontSize: 18,
                    fontColor:'white'
                },
                scales: {
                    xAxes:[{
                        gridLines:{
                            color:'#80929190'
                        },
                        barPercentage:.7,
                        stacked:true,
                        ticks:{
                            beginAtZero:true,
                            autoSkip:false,
                            fontColor:'white'
                        }
                    }],
                    yAxes: [{
                        gridLines:{
                            color:'#80929190'
                        },
                        ticks: {
                            beginAtZero:true,
                            fontColor:'white'
                        }
                    }]
                }
            }
        })
    }



    render(){   
        return(
                <canvas id='barChart' height='180'></canvas>
        )
    }
}

export default withRouter(BarChart);
