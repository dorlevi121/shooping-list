import menuStyle from "./menu.module.scss";
import React, { Component } from "react";

interface OwnState {
  open: boolean;
}

class Menu extends Component {
  state: OwnState = {
    open: false
  };
  sideBarStyle: any = {
    transform: "translateX(100%)"
  };

  openMenu = (e: any) => {
    console.log(this.state.open);
    this.setState({ open: !this.state.open });
    this.sideBarStyle = {
      transform: !this.state.open ? "translateX(0)" : "translateX(100%)"
    };
  };

  render() {
    return (
      <div className={menuStyle.Menu}>
        <div className={menuStyle.Button}>
          <input
            onClick={this.openMenu}
            type="checkbox"
            className={menuStyle.Checkbox}
            id="navi-toggle"
          />

          <label htmlFor="navi-toggle" className={menuStyle.Navigation_button}>
            <span className={menuStyle.Icon}>&nbsp;</span>
          </label>
        </div>

        <div className={menuStyle.SideBar} style={this.sideBarStyle}>
          <div className={menuStyle.Content}>
          <a href='/'>הסטוריית קניות</a>
          <a href='/'>התנתק</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
