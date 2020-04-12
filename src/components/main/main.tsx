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
import * as text from "../../assets/language/textConfig";
import { userLanguage } from "../../store/auth/auth.selectors";
import { Ingredient } from "../../models/system/ingredient.modal";
import { addIngredient } from "../../store/ingredients/ingredients.action";
import { allIngredients } from "../../store/ingredients/ingredients.selectors";
import AddProduct from "./components/add-product/add-product.main";
import NewIngredient from "./components/add-new-ingredient/add-new-ingredient.main";

const initialAlert = { show: false, type: "", text: "" };

interface OwnState {
  authUser: any;
  loading: boolean;
  modal: boolean;
  alert: { show: boolean; type: string; text: string };
  addIngredientModal: boolean;
  newIngredient: string;
}

interface StateProps {
  auth: any;
  isLoogedIn: boolean;
  allProducts: Product[];
  profile: any;
  historyList: List[];
  language: number;
  ingredients: { [title: string]: Ingredient };
}

interface DispatchProps {
  addNewProduct: typeof addNewProduct;
  changePeoduct: typeof changeProduct;
  addListToHistoryList: typeof addNewListToHistory;
  headerDetails: any;
  addNewIngredient: typeof addIngredient;
}

type Props = StateProps & DispatchProps;

class Main extends Component<Props> {
  state: OwnState = {
    authUser: null,
    loading: false,
    modal: false,
    alert: initialAlert,
    addIngredientModal: false,
    newIngredient: "",
  };

  shouldComponentUpdate(nextProps: Props, nextState: OwnState) {
    if (nextProps.isLoogedIn) {
      const str = text.myShoppingListHeader[nextProps.language];
      nextProps.headerDetails(
        str,
        nextProps.profile.firstName + " " + nextProps.profile.lastName
      );
    }
    return true;
  }

  addNewProduct = (productTitle: string) => {
    if (productTitle.length < 2) return;

    const findQuantity: any = productTitle.match(/\d/g);
    let numb = "",
      quantity: number;

    if (findQuantity !== null) {
      numb = findQuantity.join("");
      quantity = parseInt(numb);
    } else quantity = 1;

    let title = productTitle.slice(0, productTitle.length - numb.length);
    title = title.trim();

    const ingredient = this.props.ingredients[title];
    if (ingredient === undefined) {
      this.setState({
        addIngredientModal: true,
        newIngredient: productTitle,
      });
      return;
    }

    const products = this.props.allProducts;
    const check = products.find((p: Product) => p.title === title);
    if (check !== undefined) {
      this.showAlert("error", text.productExist[this.props.language]);
      this.setState({ newProduct: "" });
      return;
    }

    const newProduct: Product = {
      check: false,
      quantity: quantity,
      title: title,
      id: uniqueId(),
      ingredient: ingredient,
      note: "",
    };

    products.unshift(newProduct);
    this.props.addNewProduct(cloneDeep(products));
    this.setState({ newProduct: "" });
  };

  deleteProduct = (i: number) => {
    const products = this.props.allProducts;
    products.splice(i, 1);
    this.props.changePeoduct(products);
  };

  checkedProduct = (i: number) => {
    const products = this.props.allProducts;

    products[i].check = !products[i].check;
    products.sort((x, y) => (x.check === y.check ? 0 : x.check ? 1 : -1));

    this.props.changePeoduct(products);
  };

  addNote = (i: number, note: string) => {
    const products = this.props.allProducts;
    products[i].note = note;
    this.props.changePeoduct(products);
  };

  openModal = () => {
    const checkedProducts = this.props.allProducts.filter(
      (p: Product) => p.check
    );
    if (checkedProducts.length < 1) {
      this.showAlert("error", text.noItemsSelected[this.props.language]);
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
      this.showAlert("error", text.fillingOutForm[this.props.language]);
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
      products: checkedProducts,
    };

    historyList.unshift(newList);
    this.props.addListToHistoryList(cloneDeep(historyList));
    this.props.changePeoduct(cloneDeep(unCheckedProducts));
    this.setState({ modal: false });
    this.showAlert("success", text.orderSuccessfulAlert[this.props.language]);
  };

  showAlert = (type: string, text: string) => {
    const alert = { show: true, type: type, text: text };
    this.setState({ alert: alert });
    setTimeout(() => {
      this.setState({ alert: initialAlert });
    }, 1500);
  };

  addNewIngredient = (ing: Ingredient) => {
    if (ing.titleHeb === "") return;
    if (ing.titleEng !== undefined)
      ing.titleEng = ing.titleEng[0].toUpperCase() + ing.titleEng.substring(1);
    this.props.addNewIngredient(ing);
    this.showAlert("success", text.addedSuccessfully[this.props.language]);
    this.setState({ addIngredientModal: false });
  };

  render() {
    if (!this.props.isLoogedIn) return <Redirect to="/signin" />;

    return (
      <div className={mainStyle.Main}>
        {this.state.modal && (
          <Order onOrder={this.onOrder} openModal={this.openModal} />
        )}

        {this.state.addIngredientModal && (
          <NewIngredient
            ingredientTitle={this.state.newIngredient}
            addToDB={this.addNewIngredient}
            language={this.props.language}
            openModal={() =>
              this.setState({
                addIngredientModal: !this.state.addIngredientModal,
              })
            }
          />
        )}

        {this.state.loading && <Loading />}
        {this.state.alert.show && (
          <Alert type={this.state.alert.type} text={this.state.alert.text} />
        )}

        {!this.state.loading && (
          <React.Fragment>
            <div className={mainStyle.Content}>
              <div className={mainStyle.AddProduct}>
                <AddProduct
                  productsTitle={
                    this.props.language === 1
                      ? Object.keys(this.props.ingredients)
                      : Object.values(this.props.ingredients).map((a: any) => {
                          if (a.titleEng === undefined) return a.titleHeb;
                          else return a.titleEng;
                        })
                  }
                  language={this.props.language}
                  addNewProduct={this.addNewProduct}
                />
              </div>

              <div className={mainStyle.Products}>
                <ul>
                  {this.props.allProducts.length > 0
                    ? this.props.allProducts.map(
                        (product: Product, i: number) => {
                          return (
                            <li key={i} className={mainStyle.CheckedItem}>
                              <ProductConponent
                                product={product}
                                i={i}
                                onDelete={this.deleteProduct}
                                onCheck={this.checkedProduct}
                                addNote={this.addNote}
                                language={this.props.language}
                              />
                            </li>
                          );
                        }
                      )
                    : (<p className={mainStyle.EmptyList}>{text.emptyList[this.props.language]}</p>)}
                </ul>
              </div>
              <div onClick={this.openModal} className={mainStyle.Order}>
                <Button title={text.orderButton[this.props.language]} />
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
  language: userLanguage(state),
  ingredients: allIngredients(state),
});

const mapsDispatchToProps = (dispatch: any) => ({
  addNewProduct: (products: Product[]) => dispatch(addNewProduct(products)),
  changePeoduct: (products: Product[]) => dispatch(changeProduct(products)),
  addListToHistoryList: (lists: any) => dispatch(addNewListToHistory(lists)),
  headerDetails: (title: string, user: string) =>
    dispatch({ type: "HEADER_TITLE", title: title, user: user }),
  addNewIngredient: (Ingredient: Ingredient) =>
    dispatch(addIngredient(Ingredient)),
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapsDispatchToProps)
)(Main);
