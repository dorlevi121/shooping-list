import React from "react";
import productStyle from "./product.module.scss";
import { Product } from "../../../../models/system/product.model";
import mainStyle from "../../main.module.scss";

interface OwnProps {
  product: Product;
  i: number;
  onDelete: (i: number) => void;
  onCheck: (i: number) => void;
}

const ProductConponent: React.FC<OwnProps> = props => {
  return (
    <React.Fragment>
      <p
        className={mainStyle.DeleteChecked}
        onClick={() => props.onDelete(props.i)}
      >
        X
      </p>
      {props.product.title} - {props.product.quantity}
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
