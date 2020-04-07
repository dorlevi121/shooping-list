import React from "react";
import appStyle from "./app.module.scss";
import Routing from "./app.routing";
import { BrowserRouter } from "react-router-dom";
import Listener from "./components/auth/listener";
import Menu from "./components/menu/menu";
import Header from "./components/shared/header/header";
import { userLanguage } from "./store/auth/auth.selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { Offline, Online } from "react-detect-offline";

interface StateProps {
  language: number;
}
const App: React.FC<StateProps> = (props) => {
  return (
    <BrowserRouter>
    <Online>
    <div
        className={appStyle.App}
        style={{ direction: props.language === 1 ? "rtl" : "ltr" }}
      >
        <Listener />
        <Header title="" />
        <Menu />
        <Routing />
      </div>
    </Online>

    <Offline>
      <p>You are offline</p>
    </Offline>

    </BrowserRouter>
  );
};

const mapStateToProps = (state: any) => ({
  language: userLanguage(state),
});

export default compose<any>(connect<StateProps, null>(mapStateToProps, null))(
  App
);
