import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";


import {Bar, Line, Doughnut} from 'react-chartjs-2';

const data = {
    datasets: [{
        label: 'Sales',
        type:'line',
        data: [51, 65, 40, 49, 60, 37, 40],
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-2'
    },{
        type: 'bar',
        label: 'Visitor',
        data: [200, 185, 590, 621, 250, 400, 95],
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1'
    }]
};
const options = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    scales: {
        xAxes: [
            {
                display: true,
                gridLines: {
                    display: false
                },
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            },
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }
        ]
    }
};

const OPTION_DAY = 1;
const OPTION_WEEK = 2;
const OPTION_MONTH = 3;


class SupplyTabContentGraph extends PureComponent {

    state = {
        option : OPTION_DAY
    };

    render() {
        let element = this.props.hasOwnProperty("element") && !Config.isEmpty(this.props.element) ? this.props.element : null;

        if(!element) return( <div className={"SupplyTabContent graph"}><p className={"disclaimer"}>The supply graphs and charts are not available yet. To preview a dataset please begin by picking an item from the right panel.</p></div>);

        return (
            <div className={"SupplyTabContent Graph"}>
                <div className={"header"}>
                    <span className={"sectionTitle"}>Item</span>
                    <Tree minimal = {true} elements = {[element]} />
                    <span className={"sectionTitle"}>Options</span>
                    <div className={"time"}>
                        <div className={"option" + (this.state.option === OPTION_DAY ? " active" : "")} onClick={() => this.doOptionChange(OPTION_DAY)}>
                            <div className={"label"}><p>By Day</p></div>
                            <div className={"value"}><input type={"date"} placeholder={"Today"}/></div>
                        </div>
                        <div className={"option" + (this.state.option === OPTION_WEEK? " active" : "")} onClick={() => this.doOptionChange(OPTION_WEEK)}>
                            <div className={"label"}><p>By Week</p></div>
                            <div className={"value"}><input type={"date"} /></div>
                        </div>
                        <div className={"option" + (this.state.option === OPTION_MONTH ? " active" : "")} onClick={() => this.doOptionChange(OPTION_MONTH)}>
                            <div className={"label"}><p>By Month</p></div>
                            <div className={"value"}><input type={"date"}/></div>
                        </div>
                    </div>
                </div>
                <div className={"canvas"}>
                    <span className={"sectionTitle"}><i className="material-icons">graphic_eq</i> Stock vs. Prediction</span>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>



            </div>
        )
    }


    doOptionChange(option){
        this.setState({
            option : option
        })
    }


}
SupplyTabContentGraph.contextType = AppContext;
export default SupplyTabContentGraph;