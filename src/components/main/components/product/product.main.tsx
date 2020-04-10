import React from "react";
import productStyle from "./product.module.scss";
import { Product } from "../../../../models/system/product.model";
import mainStyle from "../../main.module.scss";

interface OwnProps {
  product: Product;
  i: number;
  onDelete: (i: number) => void;
  onCheck: (i: number) => void;
  language: number;
}

const ProductConponent: React.FC<OwnProps> = (props) => {
  return (
    <div className={productStyle.Product}>
      <span
        className={productStyle.Delete}
        onClick={() => props.onDelete(props.i)}
      >
        X
      </span>

      <span className={productStyle.Text} onClick={() => props.onCheck(props.i)}>
        {props.language === 0
          ? props.product.ingredient.titleEng
          : props.product.ingredient.titleHeb}{" "}
        - {props.product.quantity}
        <span className={productStyle.Checkmark}>&#10004;</span>
      </span>
    </div>
  );
};

export default ProductConponent;
