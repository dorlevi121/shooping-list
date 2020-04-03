import React, { Component } from "react";
import historyStyle from "./history.module.scss";
import { List } from "../../models/system/list.model";
import { compose } from "redux";
import { connect } from "react-redux";
import { historyList } from "../../store/history-list/history.selectors";
import moment from 'moment';

interface OwnState {}

interface StateProps {
  historyShoppingList: List[];
}

interface DispatchProps {}

type Props = StateProps & DispatchProps;
class History extends Component<Props> {
  render() {
    const historyShoppingList = this.props.historyShoppingList;
    console.log(historyShoppingList);

    return (
      <div className={historyStyle.History}>
        <div className={historyStyle.List}>
          {historyShoppingList.map((list: List, i: number) => {
            const sec = list.date
            console.log(sec);
            
            return(
            <div key={i}>
              {i + 1}) {moment.unix(sec.seconds).format("DD/MM/YYYY")}, {list.buyer}, {list.price}₪
            </div>
          )})}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  historyShoppingList: historyList(state)
});

const mapsDispatchToProps = (dispach: any) => ({});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapsDispatchToProps)
)(History);
