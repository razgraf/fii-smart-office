import React, { PureComponent } from "react";
import "../../resources/styles/Statistics.scss";
import AppContext from "../../Model/AppContext";
class SupplyTab extends PureComponent {

    render() {
        return (
            <div className={"SupplyTab" + (this.props.active ? " active" : "")}>
                <div className={"content"}>
                    <div className={"icon"}><i className={"material-icons"}>{this.props.element.icon}</i></div>
                    <div className={"title"}><p>{this.props.element.title}</p></div>
                </div>
            </div>
        )
    }
}
SupplyTab.contextType = AppContext;
export default SupplyTab;