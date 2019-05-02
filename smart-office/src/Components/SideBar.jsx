import React, { Component } from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarCategory from "./SideBarCategory";
import SideBarInitial from "./SideBarInitial";
import SideBarItem from "./SideBarItem";


import "../resources/styles/SideBar.scss";


class SideBar extends Component {
  state = {
    element: this.props.element,
    actions: ["Action1", "Action2", "Action3"]
  };

  getTypeOfSidebar() {
    return this.props.element === null ? (
      <SideBarInitial
        onClickSearch={this.props.onClickSearch}
        onClickRequest={this.props.onClickRequest}
      />
    ) : this.props.element.type === "item" ? (
      <SideBarItem
        element={this.props.element}
        onClickDiscardSearch={this.props.onClickDiscardSearch}
        onActionConfirmation = {this.props.onActionConfirmation}
      />
    ) : (
      <SideBarCategory
        element={this.props.element}
        onClickDiscardSearch={this.props.onClickDiscardSearch}
      />
    );
  }
  render() {
    return (
      <div id="SideBar">
        <SideBarHeader  onToggleMobileDrawer = {this.props.onToggleMobileDrawer} location={this.props.location} />
        {this.getTypeOfSidebar()}
      </div>
    );

  }
}

export default SideBar;