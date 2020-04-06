import React from "react";
import headerStyle from "./header.module.scss";
import {
  headerDetails,
  userLanguage,
} from "../../../store/auth/auth.selectors";
import { compose } from "redux";
import { connect } from "react-redux";
import { changeLanguage } from "../../../store/auth/auth.actions";

interface StateProps {
  headerDetails: { title: string; user: string };
  language: number;
}

interface DispatchProps {
  changeLanguage: typeof changeLanguage;
}

interface OwnProps {
  username?: string;
  title: string;
}

type Props = OwnProps & StateProps & DispatchProps;
const Header: React.FC<Props> = (props) => {
  return (
    <div>
      <header>
        <div className={headerStyle.Header}>
          <div className={headerStyle.FirstText}>
            <div className={headerStyle.Language}>
              <span
                style={{ fontWeight: props.language === 1 ? "bold" : "normal" }}
                onClick={() => props.changeLanguage("hebrew")}
              >
                HEB
              </span>{" "}
              /{" "}
              <span
                style={{ fontWeight: props.language === 1 ? "normal" : "bold" }}
                onClick={() => props.changeLanguage("english")}
              >
                ENG
              </span>
            </div>
            <h3>
              {props.language === 1 ? "שלום" : "Hello"}{" "}
              {props.headerDetails.user}.
            </h3>
          </div>
          <h1 className={headerStyle.Title}>{props.headerDetails.title}</h1>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  headerDetails: headerDetails(state),
  language: userLanguage(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  changeLanguage: (laguage: "hebrew" | "english") =>
    dispatch(changeLanguage(laguage)),
});

export default compose<any>(
  connect<StateProps, DispatchProps, Props>(mapStateToProps, mapDispatchToProps)
)(Header);
