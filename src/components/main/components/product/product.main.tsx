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
    <React.Fragment>
      <p
        className={mainStyle.DeleteChecked}
        onClick={() => props.onDelete(props.i)}
      >
        X
      </p>
      {props.language === 0
        ? props.product.ingredient.titleEng
        : props.product.ingredient.titleHeb}{" "}
      - {props.product.quantity}
      <p
        className={mainStyle.CheckChecked}
        onClick={() => props.onCheck(props.i)}
      >
        ✔
      </p>
    </React.Fragment>
  );
};

export default ProductConponent;
