import React, { Component } from "react";
import "../resources/styles/Main.scss";
import SideBar from "./SideBar.jsx";
import SideBar_Statistics from "./SideBar_Statistics.jsx";
import Stations from "./Stations";
import StationInfo from "./StationInfo";
import ItemStock from "./ItemStock";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.sideBarChosen) {
      case "Notifications":
        return <div />;
      case "Stations":
        return (
          <Stations
            stations={this.props.stations}
            onClickStation={this.onClickStation}
          />
        );
      case "Station":
        return (
          <div className="Station">
            <StationInfo
              stationInfo={this.props.stationInfo}
              goBackToStations={this.goBackToStations}
              elements={this.props.elements}
              itemChoose={this.itemChoose}
            />
            {this.props.chosenItem !== null ? (
              <SideBar chosenItem={this.props.chosenItem} />
            ) : null}
          </div>
        );
      case "Item Stock":
        return <ItemStock elements={this.props.elements} />;
      case "Product Requests":
        return <div />;
      case "Supply Statistics":
        return (
          <div>
            <SideBar_Statistics />
          </div>
        );

      default:
        return <div />;
    }
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };

  goBackToStations = () => {
    this.props.goBackToStations();
  };

  itemChoose = element => {
    this.props.itemChoose(element);
  };
}

export default Main;
