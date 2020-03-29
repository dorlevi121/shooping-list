import React from "react";
import headerStyle from "./header.module.scss";

interface Props {
    username: string
}

type OwnProps = Props;
const Header: React.FC <OwnProps> = (props) => {
  return (
    <div>
      <header>
        <div className={headerStyle.Header}>
          <h3 className={headerStyle.Username}>שלום {props.username} </h3>
          <h1 className={headerStyle.Title}>רשימת הקניות שלי</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
