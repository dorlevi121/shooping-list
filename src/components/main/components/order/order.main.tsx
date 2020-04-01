import React, { Component } from "react";
import Modal from "../../../shared/modal/modal";
import orderStyle from "./order.module.scss";

interface OwnState {
  form: { supermarket: string; price: number | string; name: string };
}
interface OwnProps {
  openModal: () => void;
  onOrder: (form: { supermarket: string; price: number | string; name: string }) => void;
}

export default class Order extends Component<OwnProps> {
  state: OwnState = {
    form: {
      supermarket: "",
      price: "",
      name: ""
    }
  };

  handleChange = (e: any) => {
    const newForm = this.state.form;
    if (e.target.name === "supermarket") newForm.supermarket = e.target.value;
    else if (e.target.name === "price") newForm.price = e.target.value;
    else if (e.target.name === "name") newForm.name = e.target.value;
    this.setState({ form: newForm });
  };

  render() {
    return (
      <Modal onClickButton={()=>this.props.onOrder(this.state.form)} title="הזמן סל קניות" close={() => this.props.openModal()}>
        <div className={orderStyle.Order}>
          <form action="">
            {/* Supermarker Name */}
            <div className={orderStyle.Input}>
              <input
                type="text"
                name="supermarket"
                onChange={this.handleChange}
                value={this.state.form.supermarket}
                placeholder="מקום הקניה"
                required
              />
            </div>

            {/* Price */}
            <div className={orderStyle.Input}>
              <input
                type="number"
                name="price"
                onChange={this.handleChange}
                autoComplete="off"
                value={this.state.form.price}
                placeholder="מחיר"
                required
              />
            </div>

            {/* Name */}
            <div className={orderStyle.Input}>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                autoComplete="off"
                value={this.state.form.name}
                placeholder="שם הקונה"
                required
              />
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
