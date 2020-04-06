import React, { Component } from "react";
import mainStyle from "./main.module.scss";
import { Product } from "../../models/system/product.model";
import { Button } from "../shared/button/button";
import { Redirect } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import Loading from "../shared/loading/loading";
import { addNewProduct, changeProduct } from "../../store/list/list.actions";
import { uniqueId, cloneDeep } from "lodash";
import Order from "./components/order/order.main";
import ProductConponent from "./components/product/product.main";
import { addNewListToHistory } from "../../store/history-list/history.actions";
import { List } from "../../models/system/list.model";
import Alert from "../shared/alert/alert";
import { myShoppingListHeader } from "../../assets/language/textConfig";
import { userLanguage } from "../../store/auth/auth.selectors";

const initialAlert = { show: false, type: "", text: "" };

interface OwnState {
  newProduct: string;
  authUser: any;
  loading: boolean;
  modal: boolean;
  alert: { show: boolean; type: string; text: string };
}

interface StateProps {
  auth: any;
  isLoogedIn: boolean;
  allProducts: Product[];
  profile: any;
  historyList: List[];
  language: number
}

interface DispatchProps {
  addNewProduct: typeof addNewProduct;
  changePeoduct: typeof changeProduct;
  addListToHistoryList: typeof addNewListToHistory;
  headerDetails: any;
}

type Props = StateProps & DispatchProps;

class Main extends Component<Props> {
  state: OwnState = {
    newProduct: "",
    authUser: null,
    loading: false,
    modal: false,
    alert: initialAlert
  };

  shouldComponentUpdate(nextProps: Props, nextState: OwnState) {
    if (nextProps.isLoogedIn) {
      const str = myShoppingListHeader[nextProps.language]
      nextProps.headerDetails(
      str,
        nextProps.profile.firstName + " " + nextProps.profile.lastName
      );
    }
    return true;
  }
  updateInputValue = (e: any) => {
    this.setState({
      newProduct: e.target.value
    });
  };

  addNewProduct = () => {
    if (this.state.newProduct.length < 2) return;
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

  deleteProduct = (i: number) => {
    const products = this.props.allProducts;
    products.splice(i, 1);
    this.props.changePeoduct(cloneDeep(products));
  };

  checkedProduct = (i: number) => {
    const products = this.props.allProducts;

    products[i].check = !products[i].check;
    products.sort((x, y) => (x.check === y.check ? 0 : x.check ? 1 : -1));

    this.props.changePeoduct(cloneDeep(products));
  };

  openModal = () => {
    const checkedProducts = this.props.allProducts.filter(
      (p: Product) => p.check
    );
    if (checkedProducts.length < 1) {
      this.showAlert("error", "לא נבחרו פריטים" )
      return;
    }
    this.setState({ modal: !this.state.modal });
  };

  onOrder = (form: {
    supermarket: string;
    price: number | string;
    name: string;
  }) => {
    if (form.price < 1 || form.supermarket.length < 2 || form.name.length < 2) {
      this.showAlert("error", "שגיאה במילוי הטופס" )
      return;
    }
    const checkedProducts = this.props.allProducts.filter(
      (p: Product) => p.check
    );
    const unCheckedProducts = this.props.allProducts.filter(
      (p: Product) => !p.check
    );
    const historyList: List[] = this.props.historyList;

    const newList: List = {
      buyer: form.name,
      date: new Date(),
      supermarket: form.supermarket,
      price: form.price,
      products: checkedProducts
    };

    historyList.unshift(newList);
    this.props.addListToHistoryList(cloneDeep(historyList));
    this.props.changePeoduct(cloneDeep(unCheckedProducts));
    this.setState({modal: false})
    this.showAlert("success", "ההזמנה בוצעה בהצלחה")
  };

  showAlert = (type: string, text: string) => {
    const alert = { show: true, type: type, text: text };
    this.setState({ alert: alert });
    setTimeout(() => {
      this.setState({ alert: initialAlert });
    }, 1500);
  };

  render() {
    if (!this.props.isLoogedIn) return <Redirect to="/signin" />;

    return (
      <div className={mainStyle.Main}>
        {this.state.modal && (
          <Order onOrder={this.onOrder} openModal={this.openModal} />
        )}

        {this.state.loading && <Loading />}
        {this.state.alert.show && (
          <Alert type={this.state.alert.type} text={this.state.alert.text} />
        )}

        {!this.state.loading && (
          <React.Fragment>
            {/* <Menu /> */}
            <div className={mainStyle.Content}>
              <div className={mainStyle.AddProduct}>
                <input
                  type="text"
                  maxLength={20}
                  placeholder={this.props.language === 1? "הוסף מוצר חדש..." : "Add new product"}
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
                          <ProductConponent
                            product={product}
                            i={i}
                            onDelete={this.deleteProduct}
                            onCheck={this.checkedProduct}
                          />
                        </li>
                      );
                    }
                    return (
                      <li key={i} className={mainStyle.Item}>
                        <ProductConponent
                          product={product}
                          i={i}
                          onDelete={this.deleteProduct}
                          onCheck={this.checkedProduct}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div onClick={this.openModal} className={mainStyle.Order}>
                <Button title="הזמן" />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  isLoogedIn: state.auth.isLoggedIn,
  allProducts: state.list.allProducts,
  historyList: state.historyList.historyList,
  language: userLanguage(state)
});

const mapsDispatchToProps = (dispatch: any) => ({
  addNewProduct: (products: Product[]) => dispatch(addNewProduct(products)),
  changePeoduct: (products: Product[]) => dispatch(changeProduct(products)),
  addListToHistoryList: (lists: any) => dispatch(addNewListToHistory(lists)),
  headerDetails: (title: string, user: string) =>
    dispatch({ type: "HEADER_TITLE", title: title, user: user })
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapsDispatchToProps)
)(Main);
