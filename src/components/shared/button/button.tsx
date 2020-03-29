import React from "react";
import buttonStyle from './button.module.scss';

interface Props {
  title: string;
}
export const Button: React.FC<Props> = props => {
  return (
      <button className={buttonStyle.Button}>{props.title}</button>
  );
};
