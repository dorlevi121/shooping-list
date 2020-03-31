import React, { Component } from "react";
import mainStyle from "./main.module.scss";
import { Product } from "../../models/system/product.model";
import Header from "../shared/header/header";
import { Button } from "../shared/button/button";
import Menu from "../menu/menu";
import { Redirect, RouteComponentProps } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import Loading from "../shared/loading/loading";
import {
  addNewProduct,
  changePeoduct
} from "../../store/list/list.actions";
import { uniqueId, cloneDeep } from "lodash";

interface OwnState {
  newProduct: string;
  authUser: any;
  loading: boolean;
}

interface StateProps {
  auth: any;
  isLoogedIn: boolean;
  allProducts: Product[];
  profile: any;
}

interface DispatchProps {
  addNewProduct: typeof addNewProduct;
  changePeoduct: typeof changePeoduct;
}

type Props = StateProps & DispatchProps;

class Main extends Component<Props> {
  state: OwnState = {
    newProduct: "",
    authUser: null,
    loading: false
  };

  updateInputValue = (e: any) => {
    this.setState({
      newProduct: e.target.value
    });
  };

  addNewProduct = () => {
    const findQuantity: any = this.state.newProduct.match(/\d/g);
    let numb = "",
      quantity: number;

    if (findQuantity !== null) {
      numb = findQuantity.join("");
      quantity = parseInt(numb);
    } else quantity = 1;

    const newProduct: Product = {
      check: false,
      quantity: quantity,
      title: this.state.newProduct.slice(
        0,
        this.state.newProduct.length - numb.length
      ),
      id: uniqueId()
    };
    const products = this.props.allProducts;
    products.unshift(newProduct);
    this.props.addNewProduct(cloneDeep(products));
    this.setState({ newProduct: "" });
  };

  deleteProduct = (product: Product, i: number) => {
    const products = this.props.allProducts; 
    products.splice(i, 1)           
    this.props.changePeoduct(cloneDeep(products));
  };

  checkedProduct = (product: Product, i: number) => {
    const products = this.props.allProducts;

    products[i].check = !products[i].check;
    products.sort((x, y) => x.check === y.check ? 0 : x.check ? 1 : -1);
    
    this.props.changePeoduct(cloneDeep(products));
  };

  render() {
    if (!this.props.isLoogedIn) return <Redirect to="/signin" />;

    return (
      <div className={mainStyle.Main}>
        <Header
          title="רשימת הקניות שלי"
          username={
            this.props.profile.firstName + " " + this.props.profile.lastName
          }
        />
        {this.state.loading && <Loading />}
        {!this.state.loading && (
          <div>
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
                  {this.props.allProducts.map((product: Product, i: number) => {
                    if (product.check) {
                      return (
                        <li key={i} className={mainStyle.CheckedItem}>
                          <p
                            className={mainStyle.DeleteChecked}
                            onClick={() => this.deleteProduct(product, i)}
                          >
                            X
                          </p>
                          {product.title} - {product.quantity}
                          <p
                            className={mainStyle.CheckChecked}
                            onClick={() => this.checkedProduct(product, i)}
                          >
                            ✔
                          </p>
                        </li>
                      );
                    }
                    return (
                      <li key={i} className={mainStyle.Item}>
                        <p
                          className={mainStyle.Delete}
                          onClick={() => this.deleteProduct(product, i)}
                        >
                          X
                        </p>
                        {product.title} - {product.quantity}
                        <p
                          className={mainStyle.Check}
                          onClick={() => this.checkedProduct(product, i)}
                        >
                          ✔
                        </p>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  isLoogedIn: state.auth.isLoggedIn,
  allProducts: state.list.allProducts
});

const mapsDispatchToProps = (dispacth: any) => ({
  addNewProduct: (products: Product []) => dispacth(addNewProduct(products)),
  changePeoduct: (products: Product []) => dispacth(changePeoduct(products)),
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapsDispatchToProps)
)(Main);
