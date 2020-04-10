import React, { Component } from "react";
import AddProductStyle from "./add-product.module.scss";
import { Button } from "../../../shared/button/button";
import * as text from "../../../../assets/language/textConfig";

interface OwnState {
  showOptions: boolean;
  filteredOptions: string[];
  activeOption: number;
  userInput: string;
}

interface OwnProps {
  productsTitle: string[];
  addNewProduct: (productName: string) => void;
  language: number;
}

class AddProduct extends Component<OwnProps> {
  state: OwnState = {
    showOptions: false,
    filteredOptions: [],
    activeOption: 0,
    userInput: "",
  };

  onChange = (e: any) => {
    const options = this.props.productsTitle;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };


  onProductClick = (title: string) => {
    this.setState({ userInput: title, showOptions: false });
  };

  onAddNewProduct = () => {
    this.props.addNewProduct(this.state.userInput);
    this.setState({ showOptions: false, userInput: "" });
  };

  render() {
    let optionList;
    if (this.state.showOptions && this.state.userInput) {
      if (this.state.filteredOptions.length) {
        optionList = (
          <div className={AddProductStyle.List}>
            {this.state.filteredOptions.map((optionName, index) => {
              let className;
              if (index === this.state.activeOption) {
                className = "option-active";
              }
              return (
                <p
                  onClick={() => this.onProductClick(optionName)}
                  key={optionName}
                >
                  {optionName}
                </p>
              );
            })}
          </div>
        );
      }
        
    }
    return (
      <React.Fragment>
        <div className={AddProductStyle.AddProduct}>
          <input
            type="text"
            maxLength={20}
            placeholder={text.placeholderAddProduct[this.props.language]}
            value={this.state.userInput}
            onChange={this.onChange}
          />
          <div onClick={this.onAddNewProduct}>
            <Button title={text.addButton[this.props.language]} />
          </div>
        </div>
        <div className={AddProductStyle.Options}>{optionList}</div>
      </React.Fragment>
    );
  }
}

export default AddProduct;
