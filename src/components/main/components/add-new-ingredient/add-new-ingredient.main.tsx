import React, { Component } from "react";
import Modal from "../../../shared/modal/modal";
import orderStyle from "../order/order.module.scss";
import {
  Ingredient,
  IngredientType,
} from "../../../../models/system/ingredient.modal";
import * as text from "../../../../assets/language/textConfig";

interface OwnProps {
  openModal: () => void;
  addToDB: (ingredient: Ingredient) => void;
  language: number;
}

export default class NewIngredient extends Component<OwnProps> {
  state = {
    ingredient: {
      titleHeb: "",
      titleEng: "",
      type: IngredientType.OTHER,
    },
  };

  handleChange = (e: any) => {
    const newIngredient = this.state.ingredient;
    if (e.target.name === "hebTitle") newIngredient.titleHeb = e.target.value;
    else if (e.target.name === "enTitle")
      newIngredient.titleEng = e.target.value;
    else if (e.target.value !== "DEFAULT") newIngredient.type = e.target.value;
    this.setState({ ingredient: newIngredient });
  };

  render() {
    return (
      <Modal
        onClickButton={() => this.props.addToDB(this.state.ingredient)}
        title="הזמן סל קניות"
        close={() => this.props.openModal()}
      >
        <div className={orderStyle.Order}>
          <form action="">
            {/* Hebrew Title */}
            <div className={orderStyle.Input}>
              <input
                type="text"
                name="hebTitle"
                onChange={this.handleChange}
                value={this.state.ingredient.titleHeb}
                placeholder={text.hebrewTitle[this.props.language]}
                required
              />
            </div>

            {/* English Title */}
            <div className={orderStyle.Input}>
              <input
                type="text"
                name="enTitle"
                onChange={this.handleChange}
                value={this.state.ingredient.titleEng}
                placeholder={text.englishTitle[this.props.language]}
                required
              />
            </div>

            {/* Type */}
            <div className={orderStyle.Input}>
              <select id="types" onChange={this.handleChange}>
                <option value="DEFAULT" disabled={false}>
                  {text.selectType[this.props.language]}
                </option>

                <option value={IngredientType.CANDIES}>
                  {IngredientType.CANDIES}
                </option>
                <option value={IngredientType.CANNING}>
                  {IngredientType.CANNING}
                </option>
                <option value={IngredientType.CEREALS}>
                  {IngredientType.CEREALS}
                </option>
                <option value={IngredientType.CLEANERS}>
                  {IngredientType.CLEANERS}
                </option>
                <option value={IngredientType.COSMETICS}>
                  {IngredientType.COSMETICS}
                </option>
                <option value={IngredientType.DAIRY}>
                  {IngredientType.DAIRY}
                </option>
                <option value={IngredientType.DRINKS}>
                  {IngredientType.DRINKS}
                </option>
                <option value={IngredientType.FISH}>
                  {IngredientType.FISH}
                </option>
                <option value={IngredientType.FROZEN}>
                  {IngredientType.FROZEN}
                </option>
                <option value={IngredientType.HEALTH}>
                  {IngredientType.HEALTH}
                </option>
                <option value={IngredientType.MEET}>
                  {IngredientType.MEET}
                </option>
                <option value={IngredientType.SPICES}>
                  {IngredientType.SPICES}
                </option>
                <option value={IngredientType.VEGETABLES}>
                  {IngredientType.VEGETABLES}
                </option>
                <option value={IngredientType.FRUITS}>
                  {IngredientType.FRUITS}
                </option>
                <option value={IngredientType.OTHER}>
                  {IngredientType.OTHER}
                </option>
              </select>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
