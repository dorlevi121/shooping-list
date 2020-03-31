import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { initialProductsListFromServer } from "../../store/list/list.actions";
interface StateProps {
  auth: any;
  isLoogedIn: boolean;
}

interface DispatchProps {
  changeIsLoogedIn: any;
  initialProducts: typeof initialProductsListFromServer
}

type Props = StateProps & DispatchProps;

class Listener extends Component<Props> {
  in = setInterval(() => {
    if (this.props.auth.uid && !this.props.isLoogedIn) {
      this.props.initialProducts();
      this.props.changeIsLoogedIn();
      clearInterval(this.in);
    }
  }, 100);
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  isLoogedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  changeIsLoogedIn: () => dispatch({ type: "IS_LOGGED_IN" }),
  initialProducts: () => dispatch(initialProductsListFromServer())
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(Listener);
