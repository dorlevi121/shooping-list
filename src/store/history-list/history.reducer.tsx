import { initialHistoryList } from "./history.state";
import {
  addListActionType,
  deleteListActionType,
  HistoryListActionsEnum,
  historyErrorActionType
} from "./history.types";

type allHistoryListActionType = addListActionType & deleteListActionType & historyErrorActionType;

export const historyListReducer = (
  state = initialHistoryList,
  action: allHistoryListActionType
) => {
  switch (action.type) {
    case HistoryListActionsEnum.ADD_LIST:
      console.log("ADD LIST");
      return {
        ...state,
        historyList: action.historyList
      };
    case HistoryListActionsEnum.DELETE_LIST:
      console.log("DELETE LIST");
      return {
        ...state,
        historyList: action.historyList
      };
    case HistoryListActionsEnum.HISTORY_ERROR:
      console.log("HISTORY_ERROR");
      return state;
  }
  return state;
};
