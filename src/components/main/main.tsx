import React, { Component } from "react";
import mainStyle from "./main.module.scss";
import { Product } from "../../models/system/product.model";
import Header from "./components/header.main";
import { Button } from "../shared/button/button";
import Menu from "../menu/menu";

interface OwnState {
  products: Product[];
  newProduct: string;
}

class Main extends Component {
  state: OwnState = {
    products: [
      { title: "חלב", quantity: 2, check: false },
      { title: "לחם", quantity: 1, check: false },
      { title: "גבינה", quantity: 4, check: false },
      { title: "כריות", quantity: 6, check: false },
      { title: "קוטג'", quantity: 1, check: true }
    ],
    newProduct: ""
  };

  updateInputValue = (e: any) => {
    this.setState({
      newProduct: e.target.value
    });
  };

  addNewProduct = () => {
    const quantity:number = parseInt(this.state.newProduct.slice(-1));
    const newProduct: Product = {
      check: false,
      quantity: quantity,
      title: this.state.newProduct.slice(0, this.state.newProduct.length-1)
    };
    const allProduct = [...this.state.products];
    allProduct.push(newProduct);
    this.setState({
      products: [...allProduct],
      newProduct: ""
    });
  };

  render() {
    return (
      <div className={mainStyle.Main}>
        <Header username="dor levi" />
        <Menu />
        <div className={mainStyle.Content}>
          <div className={mainStyle.AddProduct}>
            <input
              type="text"
              maxLength={20}
              placeholder="הוסף מוצר חדש..."
              value={this.state.newProduct}
              onChange={this.updateInputValue}
            />
            <div onClick={this.addNewProduct}>
              <Button title="הוסף" />
            </div>
          </div>

          <div className={mainStyle.Products}>
            <ul>
              {this.state.products.map((product: Product) => {
                if (product.check) {
                  return (
                    <li className={mainStyle.CheckedItem}>
                      <p className={mainStyle.DeleteChecked}>X</p>
                      {product.title} - {product.quantity}
                      <p className={mainStyle.CheckChecked}>✔</p>
                    </li>
                  );
                }
                return (
                  <li className={mainStyle.Item}>
                    <p className={mainStyle.Delete}>X</p>
                    {product.title} - {product.quantity}
                    <p className={mainStyle.Check}>✔</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={mainStyle.Order}>
            <Button title="הזמן" />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
