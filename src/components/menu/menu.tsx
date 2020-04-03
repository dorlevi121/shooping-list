import menuStyle from "./menu.module.scss";
import React, { Component } from "react";
import { signOut, signUp } from "../../store/auth/auth.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

interface OwnState {
  open: boolean;
}

interface StateProps {
  isLoogedIn: boolean;
}

interface DispatchProps {
  signOut: typeof signOut;
}

type Props = StateProps & DispatchProps;

class Menu extends Component<Props> {
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
    if (!this.props.isLoogedIn) return null;
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
            <Link to="/">רשימת קניות</Link>
            <Link to="/history">הסטוריית קניות</Link>
            <a href="/signin" onClick={this.props.signOut} >
              התנתק
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoogedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(signOut())
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
