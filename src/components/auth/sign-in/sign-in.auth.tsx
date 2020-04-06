import React, { Component } from "react";
import formStyle from "../../../models/SASS/patterns/form.module.scss";
import { Button } from "../../shared/button/button";
import { compose } from "redux";
import { connect } from "react-redux";
import { signIn } from "../../../store/auth/auth.actions";
import { Redirect, Link } from "react-router-dom";
import Loading from "../../shared/loading/loading";
import { userLanguage } from "../../../store/auth/auth.selectors";
import { guestSignInHeader } from "../../../assets/language/textConfig";

interface OwnState {
  form: {
    email: string;
    password: string;
  };
  loading: boolean;
}

interface StateProps {
  authError: string;
  auth: any;
  isLoogedIn: boolean;
  userLanguage: number
}

interface DispatchProps {
  signIn: typeof signIn;
  headerDetails: any
}

type Props = DispatchProps & StateProps;

class SignIn extends Component<Props> {
  state: OwnState = {
    form: {
      email: "",
      password: ""
    },
    loading: false
  };

  shouldComponentUpdate(nextProps: Props, nextState: OwnState) {            
    this.props.headerDetails(guestSignInHeader[nextProps.userLanguage], "")    
    if (this.props.authError !== nextProps.authError && !nextProps.isLoogedIn) {
      this.setState({ loading: false });
      return true;
    }
    return true;
  }

  handleChange = (e: any) => {
    let newForm = this.state.form;
    if (e.target.name === "password") newForm.password = e.target.value;
    else if (e.target.name === "email") newForm.email = e.target.value;
    this.setState({ form: newForm });
  };

  onSubmit = (e: any) => {
    this.props.signIn(this.state.form);
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
              <Button title="התחברות" />
            </div>

            <div className={formStyle.ChangePage}>
              <Link to="/signup">הרשם</Link>
            </div>
            {this.props.authError && (
              <p>
                {this.props.authError.slice(0, this.props.authError.length - 1)}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
  isLoogedIn: state.auth.isLoggedIn,
  userLanguage: userLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (credential: any) => dispatch(signIn(credential)),
  headerDetails: (title: string, user: string) =>
    dispatch({ type: "HEADER_TITLE", title: title, user: user })
});

export default compose<any>(
  connect<StateProps, DispatchProps, Props>(mapStateToProps, mapDispatchToProps)
)(SignIn);
