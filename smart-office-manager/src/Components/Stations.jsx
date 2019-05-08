import React, { Component } from "react";
import StationList from "./StationList";
import "../resources/styles/Stations.scss";
class Stations extends Component {
  render() {
    var flag = 0;
    return (
      <div className="allStations">
        <div className="breadcrumbs">
          Stations <i className="material-icons">arrow_right</i>
        </div>
        {this.props.stations.map(element => {
          if (flag !== element.floor) {
            flag = element.floor;
            return (
              <div>
                <span className="floorID">Floor {element.floor}</span>
                <span className="numberOfStations">
                  &#8226;
                  {element.size} stations
                </span>
                {this.allStations(flag)}
              </div>
            );
          }
        })}
      </div>
    );
  }
  onClickStation = element => {
    this.props.onClickStation(element);
  };

  allStations(flag) {
    return (
      <div className="stations">
        {this.props.stations.map(element => {
          if (element.floor === flag) {
            return (
              <StationList
                station={element}
                onClickStation={this.onClickStation}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default Stations;