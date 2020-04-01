import { List } from "../../models/system/list.model";

export interface HistoryListState {
    historyList: List []
}

export enum HistoryListActionsEnum {
    ADD_LIST = "ADD_LIST",
    DELETE_LIST = "DELETE_LIST",
    HISTORY_ERROR = "HISTORY_ERROR"
}

export interface HistoryListActionPattern {
    type: HistoryListActionsEnum; //Action Type
}

export interface addListActionType extends HistoryListActionPattern {
    type: HistoryListActionsEnum.ADD_LIST;
    historyList: List [];
}

export interface deleteListActionType extends HistoryListActionPattern {
    type: HistoryListActionsEnum.DELETE_LIST;
    historyList: List [];
}

export interface historyErrorActionType extends HistoryListActionPattern {
    type: HistoryListActionsEnum.HISTORY_ERROR;
    err: Error;
}