import React from "react";
import alertStyle from "./alert.module.scss";

interface OwnProps {
  type: string;
  text: string;
}

const Alert: React.FC<OwnProps> = props => {
  return (
    <div className={alertStyle.Alert}>
      {props.type === "warn" ? (
        <div className={alertStyle.Massage}>
          <p className={alertStyle.Warn}>{props.text}</p>
        </div>
      ) : null}
      {props.type === "info" ? (
        <div className={alertStyle.Massage}>
          <p className={alertStyle.Info}>{props.text} </p>
        </div>
      ) : null}
      {props.type === "error" ? (
        <div className={alertStyle.Massage}>
          <p className={alertStyle.Error}>{props.text} </p>
        </div>
      ) : null}
      {props.type === "success" ? (
        <div className={alertStyle.Massage}>
          <p className={alertStyle.Success}>{props.text} </p>
        </div>
      ) : null}
    </div>
  );
};

export default Alert;
