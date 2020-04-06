import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { initialProductsListFromServer } from "../../store/list/list.actions";
import { initialShoppingHistoryList } from "../../store/history-list/history.actions";
import { initialLanguage } from "../../store/auth/auth.actions";
interface StateProps {
  auth: any;
  isLoogedIn: boolean;
}

interface DispatchProps {
  changeIsLoogedIn: any;
  initialProducts: typeof initialProductsListFromServer;
  initialShoppingHistoryList: typeof initialShoppingHistoryList;
  initialLanguage: typeof initialLanguage;
}

type Props = StateProps & DispatchProps;

class Listener extends Component<Props> {
  shouldComponentUpdate(nextProps: Props, nextState: StateProps) {
    if (nextProps.auth.uid && !nextProps.isLoogedIn) {
      this.props.changeIsLoogedIn();
      this.props.initialLanguage();
      this.props.initialProducts();
      this.props.initialShoppingHistoryList();
    }
    return true;
  }

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
  initialProducts: () => dispatch(initialProductsListFromServer()),
  initialShoppingHistoryList: () => dispatch(initialShoppingHistoryList()),
  initialLanguage: () => dispatch(initialLanguage())
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(Listener);
