import React, { Component } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
import Config from "../../config";
import Tree from "../Tree/Tree";
import Calendar from "./Calendar";
import Moment from "moment"


class SupplyTabContentCalendar extends Component {


    constructor(props){
        super(props);


        this.state = {
            statistic : null,
            month : null,
            year : null,
            element : this.props.element,
            station : this.props.station
        };

    }


    componentWillReceiveProps(nextProps, nextContext) {
        if( (nextProps.hasOwnProperty("element") && this.state.element !== nextProps.element)
            || (nextProps.hasOwnProperty("station") && this.state.station !== nextProps.station)){

            this.setState({
                element : nextProps.element,
                station : nextProps.station
            },()=>{
                this.doPickTime(Moment().format("M"),Moment().format("YYYY"));
            });

        }
    }


    componentDidMount() {
        this.doPickTime(Moment().format("M"),Moment().format("YYYY"));
    }

    render() {

        let element = this.props.hasOwnProperty("element") && !Config.isEmpty(this.props.element) ? this.props.element : null;

        if(!element) return( <div className={"SupplyTabContent graph"}><p className={"disclaimer"}>The supply graphs and charts are not available yet. To preview a dataset please begin by picking an item from the right panel.</p></div>);

        let months = Moment.months();

        return (
            <div className={"SupplyTabContent Calendar"}>
                <div className={"header"}>
                    <span className={"sectionTitle"}>Item</span>
                    <Tree minimal = {true} elements = {[element]} />
                    <span className={"sectionTitle"}>Options</span>
                    <div className={"time"}>
                        <div className={"option active"} >
                            <div className={"label"}><p>Year</p></div>
                            <div className={"value"}>
                                <select defaultValue={this.state.year} onChange={(e)=>{this.doPickTime(this.state.month, e.target.options[e.target.selectedIndex].value)}}>
                                    {Array.from(Array(15).keys()).map(key=>{
                                        let value = 2010 + key;
                                        return (<option key={value}  value={value}>{value}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={"option active"} >
                            <div className={"label"}><p>Month</p></div>
                            <div className={"value"}>
                                <select  defaultValue={this.state.month} onChange={(e)=>{this.doPickTime( e.target.options[e.target.selectedIndex].value, this.state.year)}}>
                                    {Array.from(Array(12).keys()).map(key=>{
                                        return <option key={key+1}  value={key+1}>{months[key]}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"canvas"}>
                    <span className={"sectionTitle"}><i className="material-icons">calendar_today</i> Stock vs. Prediction Calendar</span>
                    <Calendar station={this.props.chosenStatisticsStation}   statistic={this.state.statistic} month={this.state.month} year={this.state.year}/>
                </div>



            </div>
        )
    }

    doPickTime(month,year){


        let element = this.props.element;
        let station = this.props.station;


        console.log(element, station);

        if(Config.isEmpty(element) || Config.isEmpty(station)) return;


        this.context.startLoading();
        this.context.doGetStatistics(
            Config.OPTION_MONTH,
            year+ "-" + month + "-01",
            element.ID,
            station.ID,
        ).then((statistic)=>{
            console.log(statistic);
            this.setState({
                statistic : statistic,
                month : month,
                year : year
            })
        }).catch((error) => {
            console.log(error);
            this.context.showAlert("Server error",Config.ALERT_TYPE_ERROR);
        }).finally(()=>{ this.context.stopLoading();})

    }
}


SupplyTabContentCalendar.contextType = AppContext;
export default SupplyTabContentCalendar;