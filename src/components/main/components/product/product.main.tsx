import React from "react";
import productStyle from "./product.module.scss";
import { Product } from "../../../../models/system/product.model";

interface OwnProps {
  product: Product;
  i: number;
  onDelete: (i: number) => void;
  onCheck: (i: number) => void;
  language: number;
}

const ProductConponent: React.FC<OwnProps> = (props) => {
  let style = {};
  if (props.product.check) {
    style = {
      color: "black",
    };
  }
  return (
    <div className={productStyle.Product}>
      <span
        className={productStyle.Delete}
        onClick={() => props.onDelete(props.i)}
      >
        X
      </span>

      <span
        onClick={() => props.onCheck(props.i)}
        className={productStyle.Title}
        style={props.product.check ? {textDecoration: 'line-through'} : {}}
      >
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
  );
};

export default ProductConponent;
