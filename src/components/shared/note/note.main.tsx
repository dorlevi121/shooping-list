import React, { useState } from "react";
import noteStyle from "./note.module.scss";
import { Product } from "../../../models/system/product.model";
import * as text from "../../../assets/language/textConfig";
import { Button } from "../button/button";

interface OwnProps {
  product: Product;
  language: number;
  onClickButton: (note: string) => void;
}

const Note: React.FC<OwnProps> = (props) => {
  const [note, setnote] = useState<string>(props.product.note);

  const onChange = (e: any) => {
    setnote(e.target.value);
  };

  return (
    <div
      className={noteStyle.Note}
      style={props.language === 0 ? { marginLeft: "2%" } : {}}
    >
      <div className={noteStyle.Header}>
        <p className={noteStyle.ProductTitle}>
          {props.language === 1
            ? props.product.title
            : props.product.ingredient.titleEng}
        </p>
        <div
          className={noteStyle.Button}
          onClick={() => props.onClickButton(note)}
        >
          <Button
            title={
              note !== props.product.note
                ? text.save[props.language]
                : text.close[props.language]
            }
          />
        </div>
      </div>
      <div
        style={props.language === 0 ? { marginLeft: "4%" } : {}}
        className={noteStyle.Content}
      >
        <input
          type="text"
          value={note}
          onChange={onChange}
          placeholder={note.length ? "" : text.noNote[props.language]}
        />
      </div>
    </div>
  );
};

export default Note;
