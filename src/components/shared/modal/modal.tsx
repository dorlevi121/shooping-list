import React from "react";
import modalStyle from "./modal.module.scss";
import { Button } from "../button/button";

interface OwnProps {
  close: () => void;
  title: string;
  onClickButton: () => void;
}

const Modal: React.FC<OwnProps> = props => {
  return (
    <div className={modalStyle.ModalBackground} onClick={props.close} >
      <div className={modalStyle.Modal} onClick={(e: any) => { e.stopPropagation(); }}>
        <div className={modalStyle.Header}>
          <h1>{props.title}</h1>
          <span onClick={props.close}>&times;</span>
        </div>
        <div className={modalStyle.Content}>
          <div className={modalStyle.Text}>{props.children}</div>
        </div>
        <div className={modalStyle.Footer}>
          <div onClick={props.onClickButton}>
            <Button title="הזמן" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
