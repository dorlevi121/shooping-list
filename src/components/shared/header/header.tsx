import React from "react";
import headerStyle from "./header.module.scss";
import { headerDetails } from "../../../store/auth/auth.selectors";
import { compose } from "redux";
import { connect } from "react-redux";

interface StateProps {
  headerDetails: {title: string, user: string}
}

interface OwnProps {
  username?: string;
  title: string;
}

type Props = OwnProps & StateProps;
const Header: React.FC<Props> = props => {
  return (
    <div>
      <header>
        <div className={headerStyle.Header}>
            <h3 className={headerStyle.Username}>שלום, {props.headerDetails.user}. </h3>
          <h1 className={headerStyle.Title}>{props.headerDetails.title}</h1>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  headerDetails: headerDetails(state)
})

export default compose<any>(
  connect<StateProps, null, Props>(mapStateToProps, null)
)(Header);