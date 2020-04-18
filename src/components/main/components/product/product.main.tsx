import React, { useState } from "react";
import productStyle from "./product.module.scss";
import { Product } from "../../../../models/system/product.model";
import Note from "../../../shared/note/note.main";

interface OwnProps {
  product: Product;
  i: number;
  onDelete: (i: number) => void;
  onCheck: (i: number) => void;
  addNote: any;
  language: number;
}

const ProductConponent: React.FC<OwnProps> = (props) => {
  const [modal, setmodal] = useState<boolean>(false);

  const onClickNoteButton = (note: string) => {
    props.addNote(props.i, note);
    setmodal(!modal);
  };

  return (
    <React.Fragment>
      {modal && (
        <Note
          product={props.product}
          language={props.language}
          onClickButton={onClickNoteButton}
        />
      )}
      <div className={productStyle.Product}>
        <span
          className={productStyle.Delete}
          onClick={() => props.onDelete(props.i)}
        >
          X
      </span>

        <span
          onClick={() => setmodal(!modal)}
          className={productStyle.Title}
          style={props.product.check ? { textDecoration: "line-through" } : {}}
        >
          <span style={{ fontWeight: "bold" }}>
            {props.product.note.length ? "*" : ""}
          </span>
          {props.language === 0
            ? props.product.ingredient.titleEng
            : props.product.ingredient.titleHeb}{" "}
        - {props.product.quantity}
        </span>
        {props.product.check ? (
          <span
            onClick={() => props.onCheck(props.i)}
            style={props.language === 0 ? { marginRight: "7%" } : {}}
            className={productStyle.CheckmarkCheck}
          />
        ) : (
            <span
              onClick={() => props.onCheck(props.i)}
              style={props.language === 0 ? { marginRight: "7%" } : {}}
              className={productStyle.Checkmark}
            />
          )}
      </div>
    </React.Fragment>
  );
};

export default ProductConponent;
