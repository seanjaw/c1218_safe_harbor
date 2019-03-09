import React, { Component } from 'react';
import axios from 'axios';
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
       
        var ctx = document.getElementById('pieChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Property" , "Violent"],
                datasets: [{
                    label: '# of Votes',
                    data: [property, violent],
                    backgroundColor: [
                        this.randomizer(), this.randomizer()
                    ],
                    borderColor: [
                        this.randomizer(), this.randomizer()
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                
            }
        })
    }



    render() {
        return (
            <canvas id='pieChart' width="200" height="50"></canvas>
        )
    }
}

export default PieChart;
