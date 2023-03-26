import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

let style = { color: 'grey' };
let bcolor = 'grey';
let sign;
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: false
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            ticks: {
                stepSize: 2,
            },
            grid: {
                borderDash: [10]
            }
        }
    }
};


function chooseColor(change) {
    if (change > 0) {
        style = { color: 'green' };
    } else if (change < 0) {
        style = { color: 'red' };
    } else {
        style = { color: 'grey' };
    }
}

function chooseSign(change) {
    if (change >= 0) {
        sign = '+';
    }
}

function chooseBColor(val) {
    if (val[0] > val[364]) {
        bcolor = 'red';
    } else if (val[0] < val[364]) {
        bcolor = 'green';
    } else {
        bcolor = 'grey';
    }
}

class Overview extends Component {
    state = {
        
    }
    
    render() { 
        chooseColor(parseFloat(this.props.data.change));
        chooseSign(parseFloat(this.props.data.change));
        chooseBColor(this.props.chart);
        return (
        <div>
            <div className="card m-4">
                <div className="card-body">
                    <b>Ticker: {this.props.name}</b>
                </div>
            </div>
            <div class="container">
                <b>{this.props.data.name} ({this.props.data.symbol})</b>
                <p style={{ marginBottom: '5px' }}><small>{this.props.data.exchange} - {this.props.data.exchange} Real Time Price. Currency in {this.props.data.currency}</small></p>
                <h2 style={{ color: 'black' }}><b>${Number((parseFloat(this.props.data.close)).toFixed(2))}</b></h2>
                <div class="row" style={{ marginTop: '-5px' }}>
                    <div class="col-1">
                    <h4 style={ style }>{sign}{Number((parseFloat(this.props.data.change)).toFixed(2))}</h4>
                    </div>
                    <div class="col-1">
                    <h4 style={ style }>({sign}{Number((parseFloat(this.props.data.percent_change)).toFixed(2))}%)</h4>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <Line data={{
                                labels: this.props.label,
                                datasets: [{
                                    data: this.props.chart,
                                    backgroundColor: 'transparent',
                                    borderColor: bcolor,
                                    pointBorderColor: 'transparent',
                                    pointBorderWidth: 4,
                                    tension: 0.5
                                }]}} options={options}/>
                </div>
            </div>
        </div>
        );
    }
}
 
export default Overview;