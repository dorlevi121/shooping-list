import React, { Component } from "react";
import historyStyle from "./history.module.scss";
import { List } from "../../models/system/list.model";
import { compose } from "redux";
import { connect } from "react-redux";
import { historyList } from "../../store/history-list/history.selectors";
import moment from "moment";
import { userLanguage } from "../../store/auth/auth.selectors";
import { HistoryShoppingListMenu } from "../../assets/language/textConfig";

interface OwnState {}

interface StateProps {
  historyShoppingList: List[];
  language: number;
}

interface DispatchProps {
  headerDetails: any;
}

type Props = StateProps & DispatchProps;
class History extends Component<Props> {
  shouldComponentUpdate(nextProps: Props, nextState: OwnState) {
    const str = HistoryShoppingListMenu[nextProps.language];
    nextProps.headerDetails(str);

    return true;
  }
  render() {
    const historyShoppingList = this.props.historyShoppingList;
    return (
      <div className={historyStyle.History}>
        <div className={historyStyle.List}>
          {historyShoppingList.map((list: List, i: number) => {
            const sec = list.date;
            return (
              <div key={i}>
                {i + 1}) {moment.unix(sec.seconds).format("DD/MM/YYYY")},{" "}
                {list.buyer}, {list.price}₪
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  historyShoppingList: historyList(state),
  language: userLanguage(state),
});

const mapsDispatchToProps = (dispatch: any) => ({
  headerDetails: (title: string, user: string) =>
    dispatch({ type: "HEADER_TITLE", title: title, user: user }),
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapsDispatchToProps)
)(History);
