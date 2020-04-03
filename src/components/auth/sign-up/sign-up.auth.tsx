import React, { Component } from "react";
import formStyle from "../../../models/SASS/patterns/form.module.scss";
import { Button } from "../../shared/button/button";
import { User } from "../../../models/system/user.model";
import { compose } from "redux";
import { connect } from "react-redux";
import { signUp } from "../../../store/auth/auth.actions";
import { Redirect, Link } from "react-router-dom";
import Loading from "../../shared/loading/loading";

interface OwnState {
  form: User;
  loading: boolean;
}

interface StateProps {
  auth: any;
  authError: string | null;
  isLoogedIn: boolean;
}

interface DispatchProps {
  signUp: typeof signUp;
  headerDetails: any;
}

type Props = DispatchProps & StateProps;

class SignUp extends Component<Props> {
  state: OwnState = {
    form: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    loading: false
  };

  shouldComponentUpdate(nextProps: Props, nextState: OwnState) {
    this.props.headerDetails("התחבר", "")    
    if (this.props.authError !== nextProps.authError) {
      this.setState({ loading: false });
      return true;
    }
    return true;
  }

  handleChange = (e: any) => {
    let newForm = this.state.form;
    if (e.target.name === "firstName") newForm.firstName = e.target.value;
    else if (e.target.name === "lastName") newForm.lastName = e.target.value;
    else if (e.target.name === "password") newForm.password = e.target.value;
    else if (e.target.name === "email") newForm.email = e.target.value;

    this.setState({ form: newForm });
  };

  onSubmit = (e: any) => {
    this.props.signUp(this.state.form);
    if (!this.props.isLoogedIn) this.setState({ loading: true });
    e.preventDefault();
  };

  render() {
    if (this.props.isLoogedIn) return <Redirect to="/" />;

    return (
      <div className={formStyle.Form}>
        {this.state.loading && <Loading />}

        {!this.state.loading && (
          <form onSubmit={this.onSubmit}>
            {/* First Name */}
            <div className={formStyle.FormGroup}>
              <input
                className={formStyle.Question}
                type="text"
                name="firstName"
                onChange={this.handleChange}
                autoComplete="off"
                value={this.state.form.firstName}
                required
              />
              <label htmlFor="firstName">
                <span>שם פרטי</span>
              </label>
            </div>

            {/* Last Name */}
            <div className={formStyle.FormGroup}>
              <input
                className={formStyle.Question}
                type="text"
                name="lastName"
                onChange={this.handleChange}
                autoComplete="off"
                value={this.state.form.lastName}
                required
              />
              <label htmlFor="lastName">
                <span>שם משפחה</span>
              </label>
            </div>

            {/* Email */}
            <div className={formStyle.FormGroup}>
              <input
                className={formStyle.Question}
                type="email"
                name="email"
                onChange={this.handleChange}
                autoComplete="off"
                value={this.state.form.email}
                required
              />
              <label htmlFor="email">
                <span>אימייל</span>
              </label>
            </div>

            {/* Password */}
            <div className={formStyle.FormGroup}>
              <input
                className={formStyle.Question}
                type="password"
                name="password"
                onChange={this.handleChange}
                autoComplete="off"
                value={this.state.form.password}
                required
              />
              <label htmlFor="password">
                <span>סיסמא</span>
              </label>
            </div>

            <div className={formStyle.Button}>
              <Button title="הרשמה" />
            </div>
            <div className={formStyle.ChangePage}>
              <Link to="/signin">התחבר</Link>
            </div>
            {this.props.authError && <p>{this.props.authError}</p>}
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
  isLoogedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  signUp: (user: any) => dispatch(signUp(user)),
  headerDetails: (title: string, user: string) =>
    dispatch({ type: "HEADER_TITLE", title: title, user: user })
});

export default compose<any>(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(SignUp);
