import React, { useState } from "react";
import noteStyle from "./note.module.scss";
import { Product } from "../../../models/system/product.model";
import { Button } from "../button/button";
import * as text from "../../../assets/language/textConfig";

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
    <div className={noteStyle.Note}>
      <div className={noteStyle.Header}>
        <p>{props.product.title}</p>
      </div>
      <div className={noteStyle.Content}>
        <input
          type="text"
          value={note}
          onChange={onChange}
          placeholder={note.length ? "" : text.noNote[props.language]}
        />
      </div>
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
  );
};

export default Note;
