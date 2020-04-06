import menuStyle from "./menu.module.scss";
import React, { Component } from "react";
import { signOut, signUp } from "../../store/auth/auth.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLanguage } from "../../store/auth/auth.selectors";
import {
  logOutMenu,
  shoppingListMenu,
  HistoryShoppingListMenu,
} from "../../assets/language/textConfig";

interface OwnState {
  open: boolean;
}

interface StateProps {
  isLoogedIn: boolean;
  language: number;
}

interface DispatchProps {
  signOut: typeof signOut;
}

type Props = StateProps & DispatchProps;

class Menu extends Component<Props> {
  state: OwnState = {
    open: false,
  };

  shouldComponentUpdate(nextProps: Props, nextState: OwnState) {
    if (nextProps.isLoogedIn) {
      if (this.props.language !== nextProps.language) {
        this.sideBarStyle = {
          transform:
            nextProps.language === 1 ? "translateX(100%)" : "translateX(-100%)",
        };
      }
      return true;
    }
    return false;
  }

  sideBarStyle: any = {};

  openMenu = (e: any) => {
    if (this.props.language === 1) {
      this.sideBarStyle = {
        transform: !this.state.open ? "translateX(0)" : "translateX(100%)",
      };
    } else {
      this.sideBarStyle = {
        transform: !this.state.open ? "translateX(0)" : "translateX(-100%)",
      };
    }

    this.setState({ open: !this.state.open });
  };

  render() {
    if(!this.props.isLoogedIn) return null;
    const marginLeft = this.props.language === 0 ? {marginLeft:'3%'} : {marginLeft:'0%'} ;
    return (
      <div className={menuStyle.Menu}>
        <div className={menuStyle.Button}>
          <input
            onClick={this.openMenu}
            type="checkbox"
            className={menuStyle.Checkbox}
            id="navi-toggle"
          />

          <label htmlFor="navi-toggle" className={menuStyle.Navigation_button} style ={marginLeft}>
            <span className={menuStyle.Icon}>&nbsp;</span>
          </label>
        </div>

        <div className={menuStyle.SideBar} style={this.sideBarStyle}>
          <div className={menuStyle.Content}>
            <Link to="/">{shoppingListMenu[this.props.language]}</Link>
            <Link to="/history">
              {HistoryShoppingListMenu[this.props.language]}
            </Link>
            <a href="/signin" onClick={this.props.signOut}>
              {logOutMenu[this.props.language]}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoogedIn: state.auth.isLoggedIn,
  language: userLanguage(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(signOut()),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
